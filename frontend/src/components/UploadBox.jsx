import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FiUpload } from 'react-icons/fi';

const UploadBox = ({ onFileSelect, isUploading }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      {...getRootProps()}
      className={`glass rounded-2xl p-12 text-center cursor-pointer transition-all ${
        isDragActive ? 'border-primary border-2' : ''
      }`}
    >
      <input {...getInputProps()} />
      <FiUpload className="mx-auto text-5xl text-muted-text mb-4" />
      {isUploading ? (
        <p className="text-xl font-medium">Uploading...</p>
      ) : (
        <>
          <p className="text-xl font-medium mb-2">
            {isDragActive ? 'Drop the PDF here' : 'Drag & drop your resume PDF here'}
          </p>
          <p className="text-muted-text">or click to select</p>
        </>
      )}
    </motion.div>
  );
};

export default UploadBox;
