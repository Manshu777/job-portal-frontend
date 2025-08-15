import React, { useState } from 'react';
import { Plus, Trash2, Languages, Award, Globe } from 'lucide-react';

const LanguagesForm = ({ data, onChange, template }) => {
  const [newLanguage, setNewLanguage] = useState({ name: '', level: 'Conversational', certification: '' });

  const addLanguage = () => {
    if (newLanguage.name.trim()) {
      const language = {
        id: Date.now().toString(),
        name: newLanguage.name,
        level: newLanguage.level,
        certification: newLanguage.certification
      };

      onChange({
        ...data,
        languages: [...data.languages, language]
      });
      setNewLanguage({ name: '', level: 'Conversational', certification: '' });
    }
  };

  const removeLanguage = (id) => {
    onChange({
      ...data,
      languages: data.languages.filter(lang => lang.id !== id)
    });
  };

  const updateLanguage = (id, field, value) => {
    const newLanguages = data.languages.map(lang =>
      lang.id === id ? { ...lang, [field]: value } : lang
    );
    onChange({
      ...data,
      languages: newLanguages
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Native': return 'bg-green-100 text-green-800 border-green-200';
      case 'Fluent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Conversational': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Basic': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelDescription = (level) => {
    switch (level) {
      case 'Native': return 'Native or bilingual proficiency';
      case 'Fluent': return 'Full professional proficiency';
      case 'Conversational': return 'Professional working proficiency';
      case 'Basic': return 'Elementary proficiency';
      default: return '';
    }
  };

  const commonLanguages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
    'Chinese (Mandarin)', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Dutch',
    'Swedish', 'Norwegian', 'Danish', 'Polish', 'Turkish', 'Greek', 'Hebrew'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Languages</h2>
        <p className="text-gray-600">Add languages you speak and your proficiency level</p>
      </div>

      {/* Add New Language */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#02325a]" />
          Add New Language
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <input
              type="text"
              list="common-languages"
              value={newLanguage.name}
              onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Spanish, French, Mandarin"
            />
            <datalist id="common-languages">
              {commonLanguages.map(lang => (
                <option key={lang} value={lang} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proficiency Level
            </label>
            <select
              value={newLanguage.level}
              onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Basic">Basic</option>
              <option value="Conversational">Conversational</option>
              <option value="Fluent">Fluent</option>
              <option value="Native">Native</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {getLevelDescription(newLanguage.level)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certification (Optional)
            </label>
            <input
              type="text"
              value={newLanguage.certification}
              onChange={(e) => setNewLanguage({ ...newLanguage, certification: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., TOEFL, DELE, JLPT N2"
            />
          </div>
        </div>

        <button
          onClick={addLanguage}
          disabled={!newLanguage.name.trim()}
          className="w-full bg-[#02325a] text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add Language
        </button>
      </div>

      {/* Languages List */}
      {data.languages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Languages className="w-5 h-5" />
            Your Languages ({data.languages.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.languages.map((language) => (
              <div key={language.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Languages className="w-4 h-4 text-[#02325a]" />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={language.name}
                        onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
                        className="font-semibold text-gray-900 bg-transparent border-none outline-none text-lg"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeLanguage(language.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Proficiency Level
                    </label>
                    <select
                      value={language.level}
                      onChange={(e) => updateLanguage(language.id, 'level', e.target.value)}
                      className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Native">Native</option>
                    </select>
                  </div>

                  <div className={`px-3 py-2 rounded-lg border text-sm font-medium ${getLevelColor(language.level)}`}>
                    {language.level} - {getLevelDescription(language.level)}
                  </div>

                  {language.certification && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4" />
                      <input
                        type="text"
                        value={language.certification}
                        onChange={(e) => updateLanguage(language.id, 'certification', e.target.value)}
                        className="bg-transparent border-none outline-none flex-1"
                        placeholder="Certification"
                      />
                    </div>
                  )}

                  {!language.certification && (
                    <input
                      type="text"
                      value={language.certification || ''}
                      onChange={(e) => updateLanguage(language.id, 'certification', e.target.value)}
                      className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add certification (optional)"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.languages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Languages className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No languages added yet. Add the languages you speak!</p>
        </div>
      )}

      {/* Language Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">💡 Language Tips</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Be honest about your proficiency level</li>
          <li>• Include certifications if you have them (TOEFL, IELTS, etc.)</li>
          <li>• Native speakers should list their native language</li>
          <li>• Consider including programming languages in the Skills section instead</li>
        </ul>
      </div>
    </div>
  );
};

export default LanguagesForm;