import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Footer from "../component/Footer";
import { useSearchParams } from 'react-router-dom';

const Tech = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [glossary, setGlossary] = useState({});
  const [searchParams] = useSearchParams();
  

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  //console.log(import.meta.env.VITE_GEMINI_API_KEY);
  // Generate a response using Gemini AI
  const generateContent = async (term) => {
    setLoading(true);
    setError(null);
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
      Provide a clear, technical explanation of the computer hardware term: "${term}"
      
      Include:
      1. A concise definition (1-2 sentences)
      2. What it does and how it works (2-3 sentences)
      3. Why it's important for laptop performance (1-2 sentences)
      4. Common specifications or metrics associated with it
      5. Sugguest 2-3 laptop models name that are good examples of this term.Also Present in the market.
      
      Format as JSON with these fields:
      {
        "term": "the term",
        "definition": "concise definition",
        "explanation": "how it works",
        "importance": "why it matters",
        "specs": ["spec1", "spec2", "spec3"]
        "examples": ["example1", "example2"]
      }
      `;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      console.log ("Response:", text);
      
      if (text.includes("```")) {
        // Extract JSON from between code blocks
        text = text.replace(/```(?:json)?([\s\S]*?)```/g, '$1').trim();
      }

      // Parse the JSON response
      const jsonResponse = JSON.parse(text);
      
      // Add to glossary
      setGlossary(prev => ({
        ...prev,
        [term.toLowerCase()]: jsonResponse
      }));
      
      setResults([jsonResponse, ...results]);
      setLoading(false);
    } catch (err) {
      console.error("Error generating content:", err);
      setError("Error generating content. Please try again.");
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      generateContent(query);
      setQuery("");
    }
  };
  useEffect(() => {
    const queryParam = searchParams.get('query');
    if (queryParam) {
      setQuery(queryParam);
      generateContent(queryParam);
    }
  }, [searchParams]);
  
  // Common hardware terms to create a preset glossary
  const commonTerms = [
    "CPU", 
    "GPU", 
    "RAM", 
    "SSD", 
    "HDD", 
    "Display Resolution", 
    "Refresh Rate",
    "VRAM"
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Hardware Technical Glossary</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Textarea
              placeholder="Enter a hardware term (e.g., CPU, RAM, SSD)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow"
            />
            <Button 
              type="submit" 
              disabled={loading || !query.trim()}
              className="md:self-start"
            >
              {loading ? "Generating..." : "Get Explanation"}
            </Button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        
        {/* Common Terms Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Common Hardware Terms</h2>
          <div className="flex flex-wrap gap-2">
            {commonTerms.map(term => (
              <Button
                key={term}
                variant="outline"
                onClick={() => {
                  setQuery(term);
                  generateContent(term);
                }}
                disabled={loading}
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Results Section */}
        <div className="space-y-6">
          {results.map((result, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <CardTitle>{result.term}</CardTitle>
                <CardDescription>{result.definition}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">How it works:</h3>
                    <p>{result.explanation}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Why it's important:</h3>
                    <p>{result.importance}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Common specifications:</h3>
                    <ul className="list-disc pl-5">
                      {result.specs.map((spec, i) => (
                        <li key={i}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                    <div>
                        <h3 className="font-semibold text-lg">Examples:</h3>
                        <ul className="list-disc pl-5">
                        {result.examples.map((example, i) => (
                            <li key={i}>{example}</li>
                        ))}
                        </ul>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tech;