import React, { useState } from 'react';
import { Plus, Trash2, Award, Calendar, Building, ExternalLink } from 'lucide-react';

const CertificationsForm = ({ data, onChange, template }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const addCertification = () => {
    const newCertification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      verificationUrl: '',
      logo: ''
    };

    onChange({
      ...data,
      certifications: [...data.certifications, newCertification]
    });
    setExpandedIndex(data.certifications.length);
  };

  const removeCertification = (index) => {
    const newCertifications = data.certifications.filter((_, i) => i !== index);
    onChange({
      ...data,
      certifications: newCertifications
    });
  };

  const updateCertification = (index, field, value) => {
    const newCertifications = [...data.certifications];
    newCertifications[index] = {
      ...newCertifications[index],
      [field]: value
    };
    onChange({
      ...data,
      certifications: newCertifications
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate + '-01');
    return expiry < new Date();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Certifications</h2>
        <p className="text-gray-600">Add your professional certifications and credentials</p>
      </div>

      {data.certifications.map((cert, index) => (
        <div key={cert.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {cert.name || `Certification ${index + 1}`}
              </h3>
              {cert.expiryDate && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isExpired(cert.expiryDate) 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {isExpired(cert.expiryDate) ? 'Expired' : 'Valid'}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="text-[#02325a] hover:text-blue-700 font-medium"
              >
                {expandedIndex === index ? 'Collapse' : 'Expand'}
              </button>
              <button
                onClick={() => removeCertification(index)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {expandedIndex === index && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certification Name *
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateCertification(index, 'name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., AWS Certified Solutions Architect"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issuing Organization *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Amazon Web Services"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="month"
                      value={cert.date}
                      onChange={(e) => updateCertification(index, 'date', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date (Optional)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="month"
                      value={cert.expiryDate}
                      onChange={(e) => updateCertification(index, 'expiryDate', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credential ID
                  </label>
                  <input
                    type="text"
                    value={cert.credentialId}
                    onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., ABC123XYZ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification URL
                  </label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      value={cert.verificationUrl}
                      onChange={(e) => updateCertification(index, 'verificationUrl', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://verify.example.com/credential"
                    />
                  </div>
                </div>
              </div>

              {/* Certification Preview */}
              {cert.name && cert.issuer && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Preview</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{cert.name}</div>
                      <div className="text-gray-600">{cert.issuer}</div>
                      <div className="text-sm text-gray-500">
                        Issued {formatDate(cert.date)}
                        {cert.expiryDate && (
                          <span className={isExpired(cert.expiryDate) ? 'text-red-600' : 'text-[#00223f]'}>
                            {' • '}
                            {isExpired(cert.expiryDate) ? 'Expired' : 'Expires'} {formatDate(cert.expiryDate)}
                          </span>
                        )}
                      </div>
                      {cert.credentialId && (
                        <div className="text-xs text-gray-500 mt-1">
                          Credential ID: {cert.credentialId}
                        </div>
                      )}
                    </div>
                    {cert.verificationUrl && (
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#02325a] hover:text-blue-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addCertification}
        className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-[#02325a] transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add Certification
      </button>

      {data.certifications.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Award className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No certifications added yet. Add your professional credentials!</p>
        </div>
      )}
    </div>
  );
};

export default CertificationsForm;