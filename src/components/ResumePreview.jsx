import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ResumePreview = ({ resumeData, activeTemplate }) => {
  const previewRef = useRef(null);

  const downloadPDF = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');
  };

  const templates = {
    modern: (
      <div className="p-8 bg-white text-black">
        <h1 className="text-4xl font-bold mb-4">{resumeData.personalInfo.name}</h1>
        <p>{resumeData.personalInfo.email} | {resumeData.personalInfo.phone}</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-2">Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-semibold">{edu.institution}</h3>
            <p>{edu.degree}, {edu.year}</p>
          </div>
        ))}
        
        <h2 className="text-2xl font-semibold mt-6 mb-2">Work Experience</h2>
        {resumeData.workExperience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{exp.company}</h3>
            <p>{exp.position}, {exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
        
        <h2 className="text-2xl font-semibold mt-6 mb-2">Skills</h2>
        <ul className="list-disc list-inside">
          {resumeData.skills.map((skill, index) => (
            <li key={index}>{skill.name}</li>
          ))}
        </ul>
      </div>
    ),
    classic: (
      <div className="p-8 bg-gray-100 text-black">
        <h1 className="text-3xl font-bold text-center mb-4">{resumeData.personalInfo.name}</h1>
        <p className="text-center">{resumeData.personalInfo.email} | {resumeData.personalInfo.phone}</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2 border-b border-gray-300">Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-semibold">{edu.institution}</h3>
            <p>{edu.degree}, {edu.year}</p>
          </div>
        ))}
        
        <h2 className="text-xl font-semibold mt-6 mb-2 border-b border-gray-300">Work Experience</h2>
        {resumeData.workExperience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{exp.company}</h3>
            <p>{exp.position}, {exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
        
        <h2 className="text-xl font-semibold mt-6 mb-2 border-b border-gray-300">Skills</h2>
        <ul className="list-disc list-inside">
          {resumeData.skills.map((skill, index) => (
            <li key={index}>{skill.name}</li>
          ))}
        </ul>
      </div>
    )
  };

  return (
    <motion.div 
      className="bg-muted p-4 rounded-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Preview</h2>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden" ref={previewRef}>
        <motion.div
          key={activeTemplate}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {templates[activeTemplate]}
        </motion.div>
      </div>
      <Button className="mt-4" onClick={downloadPDF}>Download PDF</Button>
    </motion.div>
  );
};

export default ResumePreview;