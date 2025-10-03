import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import { getCurrentCV } from '../../data/mockCV';

const CVAnalysis = () => {
  const { currentUser, uploadCV, analyzeCV } = useApp();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  // Load existing CV analysis if available
  const existingCV = getCurrentCV(currentUser?.id);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setResult(null);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleAnalyze = async () => {
    // Check if user is logged in
    if (!currentUser) {
      alert('Please login to use AI features');
      navigate('/login');
      return;
    }

    if (!file && !existingCV) {
      alert('Please upload a CV first');
      return;
    }

    setAnalyzing(true);

    // Simulate upload and analysis
    if (file) {
      await uploadCV(file);
    }

    // Simulate AI analysis delay
    setTimeout(async () => {
      const analysisResult = existingCV
        ? {
            score: existingCV.score,
            report: existingCV.reportJson,
          }
        : await analyzeCV(currentUser?.id);

      setResult(analysisResult);
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-primary text-primary-content py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={32} />
            <h1 className="text-4xl font-bold">CV Analysis</h1>
          </div>
          <p className="text-xl opacity-90">
            Get AI-powered insights to improve your CV and land more interviews
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Upload Section */}
        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Upload Your CV</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Select PDF file (max 5MB)</span>
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary flex-1"
                />
                <button
                  onClick={handleAnalyze}
                  className={`btn btn-primary gap-2 ${analyzing ? 'loading' : ''}`}
                  disabled={analyzing || (!file && !existingCV)}
                >
                  {!analyzing && <Sparkles size={20} />}
                  {analyzing ? 'Analyzing...' : 'Analyze CV'}
                </button>
              </div>
              {file && (
                <label className="label">
                  <span className="label-text-alt text-success">
                    ✓ {file.name} selected
                  </span>
                </label>
              )}
              {!file && existingCV && (
                <label className="label">
                  <span className="label-text-alt text-info">
                    You have an existing CV analysis. Upload a new one or re-analyze.
                  </span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Analysis Progress */}
        {analyzing && (
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="loading loading-spinner loading-lg text-primary"></div>
                <div>
                  <h3 className="font-bold text-lg">Analyzing your CV...</h3>
                  <p className="text-base-content/70">
                    Our AI is reviewing your CV structure, content, and formatting
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {(result || existingCV) && !analyzing && (
          <>
            {/* Score Card */}
            <div className="card bg-gradient-to-r from-primary to-secondary text-white shadow-xl mb-6">
              <div className="card-body text-center">
                <h2 className="card-title text-3xl justify-center mb-4">Your CV Score</h2>
                <div className="text-7xl font-bold mb-4">
                  {result?.score || existingCV?.score}/100
                </div>
                <div className="flex gap-2 justify-center">
                  <div
                    className={`badge badge-lg ${
                      (result?.score || existingCV?.score) >= 80
                        ? 'badge-success'
                        : (result?.score || existingCV?.score) >= 60
                        ? 'badge-warning'
                        : 'badge-error'
                    }`}
                  >
                    {(result?.score || existingCV?.score) >= 80
                      ? 'Excellent'
                      : (result?.score || existingCV?.score) >= 60
                      ? 'Good'
                      : 'Needs Improvement'}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Strengths */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-success gap-2">
                    <CheckCircle size={24} />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {(result?.report?.strengths || existingCV?.reportJson?.strengths)?.map(
                      (strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-success mt-1">✓</span>
                          <span>{strength}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              {/* Weaknesses */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-warning gap-2">
                    <AlertCircle size={24} />
                    Areas to Improve
                  </h3>
                  <ul className="space-y-2">
                    {(result?.report?.weaknesses || existingCV?.reportJson?.weaknesses)?.map(
                      (weakness, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-warning mt-1">⚠</span>
                          <span>{weakness}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-info gap-2 text-2xl">
                  <TrendingUp size={24} />
                  Recommendations
                </h3>
                <p className="text-base-content/70 mb-4">
                  Here are specific actions you can take to improve your CV:
                </p>
                <div className="space-y-3">
                  {(result?.report?.suggestions || existingCV?.reportJson?.suggestions)?.map(
                    (suggestion, index) => (
                      <div key={index} className="alert alert-info">
                        <div className="flex gap-2">
                          <span className="font-bold">{index + 1}.</span>
                          <span>{suggestion}</span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6 justify-center">
              <button
                onClick={() => {
                  setResult(null);
                  setFile(null);
                }}
                className="btn btn-outline"
              >
                Analyze Another CV
              </button>
              <button className="btn btn-primary gap-2">
                <Upload size={20} />
                Download Report
              </button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!result && !existingCV && !analyzing && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-2xl font-bold mb-2">Upload Your CV to Get Started</h3>
              <p className="text-base-content/70">
                Our AI will analyze your CV and provide detailed feedback to help you improve
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVAnalysis;
