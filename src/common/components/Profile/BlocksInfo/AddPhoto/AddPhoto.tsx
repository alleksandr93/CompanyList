import { useState, useRef } from 'react';
import styles from './AddPhoto.module.scss';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { createImage } from '@/slice/conpanySlice.ts';

type Props = {
    id: string;
    edit: boolean;
    onClick: () => void;
};

export const AddPhoto = ({ edit, id, onClick }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: ''
        }
    });

    const dispatch = useAppDispatch();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);

            // Создаем превью для отображения
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data: { title: string }) => {
        if (!selectedFile) return;

        try {
            await dispatch(createImage({
                id,
                file: selectedFile,
                title: data.title
            })).unwrap();

            onClick();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className={`${styles.modalOverlay} ${edit ? styles.active : ''}`}>
            <div className={styles.modal}>
                <h2 className={styles.formTitle}>Add image</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title" className={styles.label}>
                            Name*
                            {errors.title && <span className={styles.error}> {errors.title.message}</span>}
                        </label>
                        <input
                            id="title"
                            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                            placeholder="Enter a name"
                            {...register('title', {
                                required: 'This field is required',
                                minLength: {
                                    value: 3,
                                    message: 'Minimum 3 characters'
                                }
                            })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="file" className={styles.label}>
                            Image File*
                        </label>
                        <input
                            id="file"
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className={styles.fileInput}
                        />

                        <button
                            type="button"
                            className={styles.fileButton}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Select Image
                        </button>
                        {selectedFile && (
                            <div className={styles.fileInfo}>
                                Selected: {selectedFile.name}
                            </div>
                        )}
                        {previewUrl && (
                            <div className={styles.imagePreview}>
                                <img src={previewUrl} alt="Preview" />
                            </div>
                        )}
                    </div>

                    <div className={styles.formActions}>
                        <button type='submit' className={styles.submitButton}>
                            Upload image
                        </button>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => {
                                setSelectedFile(null);
                                setPreviewUrl(null);
                            }}
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={onClick}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};