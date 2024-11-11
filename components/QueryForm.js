// "use client";
// import { useState } from "react";
// import axios from 'axios';
// import { toast } from "react-hot-toast";

// const QueryForm = ({ onDataFetched }) => {
//   const [industry, setIndustry] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Construct query for web-wide search
//     const query = `"${industry}" "email" "phone" "contact"`;
//     let data = JSON.stringify({
//       "q": query,
//       "num": 100
//     });


//     let config = {
//       method: 'post',
//       url: 'https://google.serper.dev/search',
//       headers: {
//         'X-API-KEY': process.env.NEXT_PUBLIC_SER_API_KEY,
//         'Content-Type': 'application/json'
//       },
//       data: data
//     };

//     setIsLoading(true);
//     try {
//       const response = await axios(config);
//       console.log(JSON.stringify(response.data));
//       toast.success("Data fetched successfully!");
//       onDataFetched(response.data);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch data.");
//     } finally {
//       setIsLoading(false);
//       setIndustry("");
//     }
//   };

//   return (
//     <form className="w-full max-w-xs space-y-3" onSubmit={handleSubmit}>
//       <label className="block">
//         <span className="text-gray-700">Industry Keywords</span>
//         <input
//           required
//           type="text"
//           value={industry}
//           placeholder="e.g. Technology"
//           className="input input-bordered w-full mt-1"
//           onChange={(e) => setIndustry(e.target.value)}
//         />
//       </label>

//       <button
//         className="btn btn-primary btn-block"
//         type="submit"
//       >
//         Fetch Data
//         {isLoading ? (
//           <span className="loading loading-spinner loading-xs"></span>
//         ) : (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//             className="w-5 h-5"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
//               clipRule="evenodd"
//             />
//           </svg>
//         )}
//       </button>
//     </form>
//   );
// };

// export default QueryForm;


"use client";
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";

// Function to extract emails from content
const searchEmails = (content) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\.?\b/g;
  return content.match(emailRegex) || [];
};

// Function to extract phone numbers from content
const searchPhoneNumbers = (content) => {
  const phoneRegex = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  return content.match(phoneRegex) || [];
};

const QueryForm = () => {
  const [industry, setIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [companyList, setCompanyList] = useState([]);

  // Process fetched data
  const handleDataFetched = (data) => {
    console.log('Raw data:', JSON.stringify(data, null, 2));

    let companies = [];

    const processContent = (item) => {
      const content = item.snippet + ' ' + item.title;
      const pageEmails = searchEmails(content);
      const pagePhoneNumbers = searchPhoneNumbers(content);

      const company = {
        name: item.title.split('|')[0].trim(),
        domain: new URL(item.link).hostname,
        industry: industry,
        emails: pageEmails,
        phoneNumbers: pagePhoneNumbers
      };
      companies.push(company);
    };

    if (data.organic) {
      data.organic.forEach(processContent);
    }

    console.log('Processed company list:', companies);
    setCompanyList(companies);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = `"${industry}" "email" "phone" "contact"`;
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
      console.log(JSON.stringify(response.data));
      toast.success("Data fetched successfully!");
      handleDataFetched(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data.");
    } finally {
      setIsLoading(false);
      setIndustry("");
    }
  };

  return (
    <main className="min-h-screen p-8">
      <section className="space-y-12">
        <div className="max-w-2xl mx-auto">
          <form className="w-full max-w-xs space-y-3" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-gray-700">Industry Keywords</span>
              <input
                required
                type="text"
                value={industry}
                placeholder="e.g. Technology"
                className="input input-bordered w-full mt-1"
                onChange={(e) => setIndustry(e.target.value)}
              />
            </label>

            <button
              className="btn btn-primary btn-block"
              type="submit"
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
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Company Information</h2>
          {companyList.length > 0 ? (
            <div className="overflow-x-auto w-full">
              <table className="table-auto w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left border-b">Company Name</th>
                    <th className="py-3 px-4 text-left border-b">Domain</th>
                    <th className="py-3 px-4 text-left border-b">Industry</th>
                    <th className="py-3 px-4 text-left border-b">Email</th>
                    <th className="py-3 px-4 text-left border-b">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {companyList.map((company, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border-b">{company.name}</td>
                      <td className="py-2 px-4 border-b">{company.domain}</td>
                      <td className="py-2 px-4 border-b">{company.industry}</td>
                      <td className="py-2 px-4 border-b">
                        {company.emails.map((email, i) => (
                          <div key={i}>{email}</div>
                        ))}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {company.phoneNumbers.map((phone, i) => (
                          <div key={i}>{phone}</div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-600">No company information found</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default QueryForm;