import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Upload, FileType, Check } from "lucide-react";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.CreatePost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="my-12"
        >
            <motion.form 
                onSubmit={handleSubmit(submit)} 
                className="flex flex-wrap bg-white rounded-xl shadow-lg p-6 md:p-8"
                variants={containerVariants}
            >
                <motion.div 
                    className="w-full lg:w-2/3 px-3"
                    variants={itemVariants}
                >
                    <motion.div variants={itemVariants}>
                        <Input
                            label="Title :"
                            placeholder="Enter post title"
                            className="mb-5"
                            {...register("title", { required: true })}
                        />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                        <Input
                            label="Slug :"
                            placeholder="post-url-slug"
                            className="mb-5"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                    </motion.div>
                </motion.div>
                
                <motion.div 
                    className="w-full lg:w-1/3 px-3"
                    variants={itemVariants}
                >
                    <motion.div 
                        className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors duration-300"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                    >
                        <label className="flex flex-col items-center justify-center cursor-pointer">
                            <div className="flex flex-col items-center justify-center">
                                <Upload className="w-10 h-10 text-blue-500 mb-2" />
                                <p className="text-sm font-medium text-gray-700">Featured Image</p>
                                <p className="text-xs text-gray-500 mt-1 text-center">
                                    PNG, JPG, JPEG or GIF (Max size: 5MB)
                                </p>
                            </div>
                            <Input
                                type="file"
                                className="hidden"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image", { required: !post })}
                            />
                        </label>
                    </motion.div>
                    
                    {post && (
                        <motion.div 
                            className="w-full mb-6 overflow-hidden"
                            variants={itemVariants}
                        >
                            <p className="text-sm font-medium text-gray-700 mb-2">Current Image:</p>
                            <div className="rounded-lg overflow-hidden shadow-md border border-gray-200">
                                <img
                                    src={appwriteService.getFilePreview(post.featuredImage)}
                                    alt={post.title}
                                    className="w-full h-auto rounded-lg transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </motion.div>
                    )}
                    
                    <motion.div 
                        className="mb-6"
                        variants={itemVariants}
                    >
                        <Select
                            options={["active", "inactive"]}
                            label="Status :"
                            className="mb-8"
                            {...register("status", { required: true })}
                        />
                    </motion.div>
                    
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Button 
                            type="submit" 
                            bgColor={post ? "bg-green-600" : "bg-blue-600"} 
                            className="w-full flex items-center justify-center gap-2"
                        >
                            {post ? <Check size={18} /> : <FileType size={18} />}
                            {post ? "Update Post" : "Create Post"}
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.form>
        </motion.div>
    );
}