import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiFileText, FiCheckCircle } from 'react-icons/fi';
import UploadBox from '../components/UploadBox';
import { resumeAPI, analysisAPI } from '../api';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedResume, setUploadedResume] = useState(null);
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const resume = await resumeAPI.upload(formData);
      setUploadedResume(resume);
      toast.success('Resume uploaded successfully!');
    } catch (err) {
      const detail = err.response?.data?.detail;
      const message = typeof detail === 'string'
        ? detail
        : err.message === 'Network Error'
          ? 'Cannot reach server. Is the backend running?'
          : 'Upload failed';
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedResume?.id) return;

    setIsAnalyzing(true);
    try {
      const analysis = await analysisAPI.run(uploadedResume.id);
      toast.success('Analysis complete!');
      navigate(`/analysis/${analysis.id}`);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Upload Your Resume</h1>
        <p className="text-muted-text">Let AI analyze your career potential.</p>
      </motion.div>

      {!uploadedResume ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <UploadBox onFileSelect={handleFileSelect} isUploading={isUploading} />
          
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <FiFileText className="text-3xl text-primary" />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-muted-text text-sm">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? <Loader size="sm" /> : 'Upload Resume'}
              </button>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 text-center"
        >
          <FiCheckCircle className="text-6xl text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Resume Uploaded!</h2>
          <p className="text-muted-text mb-8">Ready to analyze your career potential.</p>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? <Loader size="sm" /> : 'Run Analysis'}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Upload;
