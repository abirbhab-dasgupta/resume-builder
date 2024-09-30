import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';

const ResumeEditor = ({ resumeData, setResumeData, activeTemplate, setActiveTemplate }) => {
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [atsScore, setAtsScore] = useState(0);

  const handleInputChange = (section, field, value, index = null) => {
    setResumeData(prevData => {
      if (index !== null) {
        const newSection = [...prevData[section]];
        newSection[index] = { ...newSection[index], [field]: value };
        return { ...prevData, [section]: newSection };
      }
      return { ...prevData, [section]: { ...prevData[section], [field]: value } };
    });
  };

  const addItem = (section) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: [...prevData[section], {}]
    }));
  };

  const removeItem = (section, index) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    // Calculate ATS score
    const calculateATSScore = () => {
      let score = 0;
      const sections = ['personalInfo', 'education', 'workExperience', 'skills'];
      
      sections.forEach(section => {
        if (Array.isArray(resumeData[section])) {
          score += resumeData[section].length * 10;
        } else {
          score += Object.values(resumeData[section]).filter(Boolean).length * 10;
        }
      });

      return Math.min(100, score);
    };

    setAtsScore(calculateATSScore());
  }, [resumeData]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Select value={activeTemplate} onValueChange={setActiveTemplate}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modern">Modern</SelectItem>
            <SelectItem value="classic">Classic</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div 
        className="flex space-x-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {['personalInfo', 'education', 'workExperience', 'skills'].map(section => (
          <Button
            key={section}
            variant={activeSection === section ? 'default' : 'outline'}
            onClick={() => setActiveSection(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Label>ATS Score</Label>
        <Progress value={atsScore} className="w-full" />
        <p className="text-sm text-muted-foreground mt-2">Your resume is {atsScore}% ATS-friendly</p>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={`${activeSection}-section`}
        >
          {activeSection === 'personalInfo' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) =>
                    handleInputChange('personalInfo', 'email', e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) =>
                    handleInputChange('personalInfo', 'phone', e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {activeSection === 'education' && (
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-muted rounded-lg space-y-2"
                >
                  <Input
                    placeholder="Institution"
                    value={edu.institution || ''}
                    onChange={(e) =>
                      handleInputChange('education', 'institution', e.target.value, index)
                    }
                  />
                  <Input
                    placeholder="Degree"
                    value={edu.degree || ''}
                    onChange={(e) =>
                      handleInputChange('education', 'degree', e.target.value, index)
                    }
                  />
                  <Input
                    placeholder="Year"
                    value={edu.year || ''}
                    onChange={(e) =>
                      handleInputChange('education', 'year', e.target.value, index)
                    }
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem('education', index)}
                  >
                    <Minus className="w-4 h-4 mr-2" /> Remove
                  </Button>
                </motion.div>
              ))}
              <Button onClick={() => addItem('education')}>
                <Plus className="w-4 h-4 mr-2" /> Add Education
              </Button>
            </div>
          )}

          {activeSection === 'workExperience' && (
            <div className="space-y-4">
              {resumeData.workExperience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-muted rounded-lg space-y-2"
                >
                  <Input
                    placeholder="Company"
                    value={exp.company || ''}
                    onChange={(e) =>
                      handleInputChange('workExperience', 'company', e.target.value, index)
                    }
                  />
                  <Input
                    placeholder="Position"
                    value={exp.position || ''}
                    onChange={(e) =>
                      handleInputChange('workExperience', 'position', e.target.value, index)
                    }
                  />
                  <Input
                    placeholder="Duration"
                    value={exp.duration || ''}
                    onChange={(e) =>
                      handleInputChange('workExperience', 'duration', e.target.value, index)
                    }
                  />
                  <Textarea
                    placeholder="Description"
                    value={exp.description || ''}
                    onChange={(e) =>
                      handleInputChange('workExperience', 'description', e.target.value, index)
                    }
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem('workExperience', index)}
                  >
                    <Minus className="w-4 h-4 mr-2" /> Remove
                  </Button>
                </motion.div>
              ))}
              <Button onClick={() => addItem('workExperience')}>
                <Plus className="w-4 h-4 mr-2" /> Add Work Experience
              </Button>
            </div>
          )}

          {activeSection === 'skills' && (
            <div className="space-y-4">
              {resumeData.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, rotate: -5, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, rotate: 5, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-2"
                >
                  <Input
                    placeholder="Skill"
                    value={skill.name || ''}
                    onChange={(e) =>
                      handleInputChange('skills', 'name', e.target.value, index)
                    }
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem('skills', index)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
              <Button onClick={() => addItem('skills')}>
                <Plus className="w-4 h-4 mr-2" /> Add Skill
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ResumeEditor;