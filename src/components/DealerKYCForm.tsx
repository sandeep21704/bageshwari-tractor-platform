import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';

export const DealerKYCForm: React.FC = () => {
  const { submitKYC, pushToast, navigateTo } = useAppState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initializing state with all 14 fields from our master architecture
  const [formData, setFormData] = useState({
    firmName: '',
    panVatNumber: '',
    ownerName: '',
    citizenshipNumber: '',
    email: '',
    mobileNumber: '',
    whatsappNumber: '',
    address: '',
    areaCovered: '',
    preferredTransportName: '',
    estimatedMonthlyPurchaseNPR: '',
  });

  // We handle files separately to simulate Cloud Storage uploads
  const [documents, setDocuments] = useState({
    docFirmReg: null as File | null,
    docPanVat: null as File | null,
    docCitizenship: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setDocuments((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated API Call to upload documents to AWS S3 / Vercel Blob
    // and save the final URLs to the database.
    setTimeout(() => {
      submitKYC(formData); // Updates context state to 'PENDING'
      setIsSubmitting(false);
      pushToast("Application Submitted", "Your documents are under review by our accounts team.", "success");
      navigateTo('home');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg rounded-xl border border-gray-100">
      <div className="mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">B2B Dealer Registration</h2>
        <p className="text-gray-500 mt-2">Submit your KYC documents to unlock exclusive wholesale pricing and credit facilities.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: Business Details */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b-2 border-blue-500 inline-block pb-1">1. Firm Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registered Firm Name *</label>
              <input required type="text" name="firmName" onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50" placeholder="e.g. Mid-West Agri Machinery" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PAN/VAT Number *</label>
              <input required type="number" name="panVatNumber" onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50" placeholder="9-digit PAN/VAT" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
              <input required type="text" name="address" onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50" placeholder="Street, Ward, Municipality, District" />
            </div>
          </div>
        </section>

        {/* SECTION 2: Owner Details */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b-2 border-blue-500 inline-block pb-1">2. Owner Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Full Name *</label>
              <input required type="text" name="ownerName" onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Citizenship Number *</label>
              <input required type="text" name="citizenshipNumber" onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input required type="tel" name="mobileNumber" onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number (For Alerts) *</label>
              <input required type="tel" name="whatsappNumber" onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" name="email" onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            </div>
          </div>
        </section>

        {/* SECTION 3: Logistics & Operations */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b-2 border-blue-500 inline-block pb-1">3. Trade Operations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Sales Area / Territory *</label>
              <input required type="text" name="areaCovered" onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50" placeholder="e.g. Dang, Banke, Bardiya" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Transport/Bus Name *</label>
              <input required type="text" name="preferredTransportName" onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50" placeholder="e.g. Bheri Transport or Bus No." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Monthly Purchase</label>
              <select name="estimatedMonthlyPurchaseNPR" onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option value="">Select Range</option>
                <option value="50000">Below 50,000 NPR</option>
                <option value="150000">50,000 - 2,00,000 NPR</option>
                <option value="500000">2,00,000 - 5,00,000 NPR</option>
                <option value="1000000">Above 5,00,000 NPR</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECTION 4: Document Uploads */}
        <section className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">4. KYC Document Upload</h3>
          <p className="text-sm text-blue-700 mb-6">Please upload clear photos or scanned copies of the following documents (Max 5MB each).</p>
          
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded border">
              <span className="font-medium text-gray-700">Firm Registration Certificate *</span>
              <input required type="file" name="docFirmReg" accept="image/*,.pdf" onChange={handleFileChange} className="mt-2 md:mt-0 text-sm" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded border">
              <span className="font-medium text-gray-700">PAN / VAT Certificate *</span>
              <input required type="file" name="docPanVat" accept="image/*,.pdf" onChange={handleFileChange} className="mt-2 md:mt-0 text-sm" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded border">
              <span className="font-medium text-gray-700">Owner's Citizenship (Front & Back) *</span>
              <input required type="file" name="docCitizenship" accept="image/*,.pdf" onChange={handleFileChange} className="mt-2 md:mt-0 text-sm" />
            </div>
          </div>
        </section>

        {/* SUBMIT BUTTON */}
        <div className="pt-6 border-t">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-4 rounded-md text-lg font-bold text-white transition-all ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md'
            }`}
          >
            {isSubmitting ? 'Uploading Documents & Submitting...' : 'Submit KYC Registration'}
          </button>
          <p className="text-center text-xs text-gray-400 mt-4">By submitting, you agree to our B2B trade terms and conditions.</p>
        </div>

      </form>
    </div>
  );
};
