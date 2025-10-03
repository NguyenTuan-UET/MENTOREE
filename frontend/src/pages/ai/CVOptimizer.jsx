import { useState } from 'react';
import { Target, Upload, FileText, Sparkles, CheckCircle, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import { getCurrentCV } from '../../data/mockCV';

const CVOptimizer = () => {
  const { currentUser, optimizeCV } = useApp();
  const navigate = useNavigate();
  const [cvFile, setCVFile] = useState(null);
  const [jdFile, setJDFile] = useState(null);
  const [jdText, setJDText] = useState('');
  const [inputMode, setInputMode] = useState('file'); // 'file' or 'text'
  const [optimizing, setOptimizing] = useState(false);
  const [result, setResult] = useState(null);

  const existingCV = getCurrentCV(currentUser?.id);

  const handleCVFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setCVFile(selectedFile);
      setResult(null);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleJDFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setJDFile(selectedFile);
      setResult(null);
    } else {
      alert('Please upload a valid file');
    }
  };

  const handleOptimize = async () => {
    // Check if user is logged in
    if (!currentUser) {
      alert('Please login to use AI features');
      navigate('/login');
      return;
    }

    if (!cvFile && !existingCV) {
      alert('Please upload your CV first');
      return;
    }

    if (inputMode === 'file' && !jdFile) {
      alert('Please upload the job description');
      return;
    }

    if (inputMode === 'text' && !jdText.trim()) {
      alert('Please paste the job description');
      return;
    }

    setOptimizing(true);

    // Simulate AI optimization delay
    setTimeout(async () => {
      const optimizationResult = {
        matchScore: 75,
        missingSkills: ['Docker', 'Kubernetes', 'AWS Lambda', 'GraphQL'],
        presentSkills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB'],
        suggestions: [
          'Add more specific examples of cloud infrastructure experience',
          'Highlight your containerization and orchestration skills',
          'Include metrics and numbers to quantify your achievements',
          'Add keywords from the job description naturally throughout your CV',
          'Emphasize your experience with microservices architecture',
        ],
        sectionRecommendations: {
          technical: 'Add Docker, Kubernetes, and AWS to your technical skills section',
          experience: 'Rephrase your previous roles to align with the job requirements',
          projects: 'Include a project that demonstrates cloud deployment experience',
        },
      };

      setResult(optimizationResult);
      setOptimizing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-accent text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Target size={32} />
            <h1 className="text-4xl font-bold">CV Optimizer</h1>
          </div>
          <p className="text-xl opacity-90">
            Optimize your CV for specific job descriptions and increase your chances
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* CV Upload - Left Column */}
          <div className="card bg-base-100 shadow-xl h-full">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">
                <FileText size={28} className="text-primary" />
                Upload Your CV
              </h2>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">CV File (PDF, max 5MB) *</span>
                </label>

                
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleCVFileChange}
                  className="file-input file-input-bordered file-input-primary file-input-lg w-full"
                />

                {cvFile && (
                  <div className="alert alert-success mt-4">
                    <CheckCircle size={20} />
                    <span className="font-semibold">{cvFile.name}</span>
                  </div>
                )}
                {!cvFile && existingCV && (
                  <div className="alert alert-info mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Using your existing CV</span>
                  </div>
                )}
              </div>

              <div className="divider"></div>

              <div className="bg-base-200 p-6 rounded-lg space-y-3">
                <h3 className="font-bold text-lg mb-3">📄 CV Tips:</h3>
                <div className="space-y-2 text-sm">
                  <p>✓ Use a clean, professional format</p>
                  <p>✓ Highlight relevant skills and experience</p>
                  <p>✓ Include measurable achievements</p>
                  <p>✓ Keep it concise (1-2 pages)</p>
                  <p>✓ Use keywords from job descriptions</p>
                </div>
              </div>
            </div>
          </div>

          {/* JD Upload - Right Column */}
          <div className="card bg-base-100 shadow-xl h-full flex flex-col">
            <div className="card-body flex flex-col flex-1">
              <h2 className="card-title text-2xl mb-4 flex-shrink-0">
                <Target size={28} className="text-secondary" />
                Job Description
              </h2>

              <div className="tabs tabs-boxed mb-4 flex-shrink-0">
                <button
                  className={`tab tab-lg ${inputMode === 'file' ? 'tab-active' : ''}`}
                  onClick={() => setInputMode('file')}
                >
                  <Upload size={18} className="mr-2" />
                  Upload File
                </button>
                <button
                  className={`tab tab-lg ${inputMode === 'text' ? 'tab-active' : ''}`}
                  onClick={() => setInputMode('text')}
                >
                  <FileText size={18} className="mr-2" />
                  Paste Text
                </button>
              </div>

              {inputMode === 'file' ? (
                <div className="form-control flex-shrink-0">
                  <label className="label">
                    <span className="label-text font-semibold text-lg">JD File (PDF, TXT, DOC) *</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleJDFileChange}
                    className="file-input file-input-bordered file-input-secondary file-input-lg w-full"
                  />
                  {jdFile && (
                    <div className="alert alert-success mt-4">
                      <CheckCircle size={20} />
                      <span className="font-semibold">{jdFile.name}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <textarea
                    className="textarea textarea-bordered textarea-lg flex-1 w-full"
                    placeholder="Paste the complete job description here including requirements, responsibilities, and qualifications..."
                    value={jdText}
                    onChange={(e) => setJDText(e.target.value)}
                  />
                  <div className="text-right mt-2">
                    <span className="text-xs text-base-content/60">{jdText.length} characters</span>
                  </div>
                </div>
              )}

              <div className="divider"></div>

              <div className="bg-base-200 p-6 rounded-lg space-y-3">
                <h3 className="font-bold text-lg mb-3">🎯 What We Analyze:</h3>
                <div className="space-y-2 text-sm">
                  <p>• Required skills match</p>
                  <p>• Experience level alignment</p>
                  <p>• Keywords optimization</p>
                  <p>• ATS compatibility score</p>
                  <p>• Improvement suggestions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optimize Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleOptimize}
            className={`btn btn-primary btn-lg gap-3 px-8 ${optimizing ? 'loading' : ''}`}
            disabled={optimizing || (!cvFile && !existingCV) || (!jdFile && !jdText.trim())}
          >
            {!optimizing && <Sparkles size={24} />}
            <span className="text-lg">{optimizing ? 'Analyzing Your CV...' : 'Optimize My CV'}</span>
            {!optimizing && <ArrowRight size={24} />}
          </button>
        </div>

        {/* Optimization Progress */}
        {optimizing && (
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="loading loading-spinner loading-lg text-secondary"></div>
                <div>
                  <h3 className="font-bold text-lg">Analyzing and Optimizing...</h3>
                  <p className="text-base-content/70">
                    Comparing your CV with the job requirements
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !optimizing && (
          <>
            {/* Match Score */}
            <div className="card bg-gradient-to-r from-secondary to-accent text-white shadow-xl mb-6">
              <div className="card-body text-center">
                <h2 className="card-title text-3xl justify-center mb-4">Match Score</h2>
                <div className="radial-progress text-white text-6xl font-bold" style={{"--value": result.matchScore, "--size": "12rem", "--thickness": "1rem"}}>
                  {result.matchScore}%
                </div>
                <p className="text-lg mt-4 opacity-90">
                  Your CV matches {result.matchScore}% of the job requirements
                </p>
              </div>
            </div>

            {/* Skills Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Missing Skills */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-error gap-2">
                    <X size={24} />
                    Missing Skills
                  </h3>
                  <p className="text-sm text-base-content/70 mb-3">
                    Skills mentioned in the JD that are not in your CV
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((skill, index) => (
                      <div key={index} className="badge badge-error badge-lg gap-2">
                        <X size={14} />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Present Skills */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-success gap-2">
                    <CheckCircle size={24} />
                    Matching Skills
                  </h3>
                  <p className="text-sm text-base-content/70 mb-3">
                    Skills you have that match the job requirements
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.presentSkills.map((skill, index) => (
                      <div key={index} className="badge badge-success badge-lg gap-2">
                        <CheckCircle size={14} />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Optimization Suggestions */}
            <div className="card bg-base-100 shadow-xl mb-6">
              <div className="card-body">
                <h3 className="card-title text-2xl text-info gap-2">
                  <ArrowRight size={24} />
                  Optimization Suggestions
                </h3>
                <p className="text-base-content/70 mb-4">
                  Follow these recommendations to improve your CV for this specific role:
                </p>
                <div className="space-y-3">
                  {result.suggestions.map((suggestion, index) => (
                    <div key={index} className="alert alert-info">
                      <div className="flex gap-2">
                        <span className="font-bold">{index + 1}.</span>
                        <span>{suggestion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section-Specific Recommendations */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-4">Section-by-Section Tips</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold text-lg mb-2">Technical Skills</h4>
                    <p className="text-base-content/70">
                      {result.sectionRecommendations.technical}
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-bold text-lg mb-2">Work Experience</h4>
                    <p className="text-base-content/70">
                      {result.sectionRecommendations.experience}
                    </p>
                  </div>
                  <div className="border-l-4 border-accent pl-4">
                    <h4 className="font-bold text-lg mb-2">Projects</h4>
                    <p className="text-base-content/70">
                      {result.sectionRecommendations.projects}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={() => {
                  setResult(null);
                  setCVFile(null);
                  setJDFile(null);
                  setJDText('');
                }}
                className="btn btn-outline"
              >
                Optimize Another
              </button>
              <button className="btn btn-primary gap-2">
                <Upload size={20} />
                Download Report
              </button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!result && !optimizing && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-2">Optimize Your CV for Any Job</h3>
              <p className="text-base-content/70 max-w-2xl mx-auto">
                Upload your CV and a job description to get personalized suggestions on how to
                improve your match score and stand out to employers
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVOptimizer;
