"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";

// Helper function to extract information from search results
const extractInfo = (data, emailDomain, area, title, industry) => {
  const results = [];
  data.organic.forEach((entry) => {
    const snippet = entry.snippet || '';
    const emailMatch = snippet.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    const companyMatch = snippet.match(/(?:at|@)\s+([^,]+)/i);
    const titleMatch = snippet.match(new RegExp(title, 'i'));
    const areaMatch = snippet.match(new RegExp(area, 'i'));

    if (emailMatch) {
      results.push({
        email: emailMatch[0],
        company: companyMatch ? companyMatch[1].trim() : 'Unknown',
        title: titleMatch ? titleMatch[0] : title,
        area: areaMatch ? areaMatch[0] : area,
        industry: industry
      });
    }
  });
  return results;
};

const QueryFormLinkedIn = () => {
  const [results, setResults] = useState([]);
  const [emailDomain, setEmailDomain] = useState("");
  const [area, setArea] = useState("");
  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [site, setSite] = useState("linkedin.com/in/");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = `"${emailDomain}" AND "${area}" AND "${title}" AND "${industry}" site:${site}`;
    let data = JSON.stringify({
      "q": query,
      "num": 100
    });
    let config = {
      method: 'post',
      url: 'https://google.serper.dev/search',
      headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_SER_API_KEY,
        'Content-Type': 'application/json'
      },
      data: data
    };
    setIsLoading(true);
    try {
      const response = await axios(config);
      toast.success("Data fetched successfully!");
      setResults(extractInfo(response.data, emailDomain, area, title, industry));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data.");
    } finally {
      setIsLoading(false);
      setIsDisabled(true);
    }
  };

  return (
    <main className="min-h-screen p-8 pb-24">

      <section className="max-w-xl mx-auto space-y-8">
        <form className="w-full max-w-xs space-y-3" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-gray-700">Email Domain</span>
            <input
              required
              type="text"
              value={emailDomain}
              placeholder="gmail.com"
              className="input input-bordered w-full mt-1"
              onChange={(e) => setEmailDomain(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Area</span>
            <input
              required
              type="text"
              value={area}
              placeholder="California"
              className="input input-bordered w-full mt-1"
              onChange={(e) => setArea(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Job Title</span>
            <input
              required
              type="text"
              value={title}
              placeholder="CEO"
              className="input input-bordered w-full mt-1"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Industry</span>
            <input
              required
              type="text"
              value={industry}
              placeholder="Technology"
              className="input input-bordered w-full mt-1"
              onChange={(e) => setIndustry(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">LinkedIn or Other Site Profile URL Prefix</span>
            <input
              required
              type="text"
              value={site}
              placeholder="linkedin.com/in/"
              className="input input-bordered w-full mt-1"
              onChange={(e) => setSite(e.target.value)}
            />
          </label>

          <button
            className="btn btn-primary btn-block"
            type="submit"
            disabled={isDisabled}
          >
            Fetch Data
            {isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </form>
        <div>
          <h2 className="text-2xl font-bold">Results List</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300">Email</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Company</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Title</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Area</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Industry</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-200">{result.email}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{result.company}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{result.title}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{result.area}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{result.industry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default QueryFormLinkedIn;