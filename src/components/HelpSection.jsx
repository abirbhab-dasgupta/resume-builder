import React from 'react';

function HelpSection() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">How to Use the Resume Builder</h1>
      <ol className="list-decimal list-inside space-y-4">
        <li>Fill out your personal information in the "Personal Info" section.</li>
        <li>Add your educational background in the "Education" section. You can add multiple entries.</li>
        <li>Include your work experiences in the "Work Experience" section. Don't forget to add detailed descriptions.</li>
        <li>List your skills in the "Skills" section.</li>
        <li>Choose a template that best suits your style from the dropdown menu.</li>
        <li>Preview your resume in real-time on the right side of the screen (or below on mobile devices).</li>
        <li>Once you're satisfied with your resume, click the "Download PDF" button to save it.</li>
      </ol>
      <p className="mt-6">
        Remember, your progress is automatically saved in your browser. You can come back anytime to edit or update your resume.
      </p>
    </div>
  );
}

export default HelpSection;