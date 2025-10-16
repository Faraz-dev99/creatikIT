'use client'

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SingleSelect from "@/app/component/SingleSelect";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DateSelector from "@/app/component/DateSelector";

interface ErrorInterface {
    [key: string]: string;
}

interface CustomerImage {
    title: string;
    file: File | null;
}

interface ProjectData {
    ProjectName: string;
    ProjectType: string;
    ProjectStatus: string;
    City: string;
    Location: string;
    Area: string;
    Address: string;
    Range: string;
    Amenities: string;
    Facilities: string;
    Description: string;
    Video: string;
    GoogleMap: string;
    CustomerImages: CustomerImage[];
    SitePlan: File | null;
}




export default function CompanyProjectAdd() {
    const [projectData, setProjectData] = useState<ProjectData>({
        ProjectName: "",
        ProjectType: "",
        ProjectStatus: "",
        City: "",
        Location: "",
        Area: "",
        Address: "",
        Range: "",
        Amenities: "",
        Facilities: "",
        Description: "",
        Video: "",
        GoogleMap: "",
        CustomerImages: Array(6).fill({ title: "", file: null }),
        SitePlan: null,
    });

    const [errors, setErrors] = useState<ErrorInterface>({});
    const router = useRouter();

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setProjectData((prev) => ({ ...prev, [name]: value }));
            setErrors((prev) => ({ ...prev, [name]: "" }));
        },
        []
    );

    const handleSelectChange = useCallback(
        (label: string, selected: string) => {
            setProjectData((prev) => ({ ...prev, [label]: selected }));
            setErrors((prev) => ({ ...prev, [label]: "" }));
        },
        []
    );

    const handleCustomerImageChange = (index: number, field: "title" | "file", value: string | File | null) => {
        const updatedImages = [...projectData.CustomerImages];
        updatedImages[index] = { ...updatedImages[index], [field]: value };
        setProjectData((prev) => ({ ...prev, CustomerImages: updatedImages }));
    };


    const handleSitePlanChange = (file: File | null) => {
        setProjectData((prev) => ({ ...prev, SitePlan: file }));
    };

    const validateForm = () => {
        const newErrors: ErrorInterface = {};
        if (!projectData.ProjectName.trim()) newErrors.ProjectName = "Project Name is required";
        if (!projectData.ProjectType.trim()) newErrors.ProjectType = "Project Type is required";
        if (!projectData.ProjectStatus.trim()) newErrors.ProjectStatus = "Project Status is required";
        if (!projectData.City.trim()) newErrors.City = "City is required";
        if (!projectData.Location.trim()) newErrors.Location = "Location is required";
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        toast.success("Project added successfully!");
        setProjectData({
            ProjectName: "",
            ProjectType: "",
            ProjectStatus: "",
            City: "",
            Location: "",
            Area: "",
            Address: "",
            Range: "",
            Amenities: "",
            Facilities: "",
            Description: "",
            Video: "",
            GoogleMap: "",
            CustomerImages: [
                { title: "", file: null },
                { title: "", file: null },
                { title: "", file: null },
                { title: "", file: null },
                { title: "", file: null },
                { title: "", file: null },
            ],
            SitePlan: null,
        });
        setErrors({});
        router.push("/company-projects");
    };

    // Example options for selects
    const projectTypes = ["Residential", "Commercial", "Industrial"];
    const projectStatuses = ["Ongoing", "Completed", "Planned"];

    return (
        <div className="bg-slate-200 min-h-screen p-6 flex justify-center">
            <Toaster position="top-right" />
            <div className="w-full max-w-[900px]">
                <div className="flex justify-end mb-4">
                    <Link
                        href="/company_project"
                        className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
                    >
                        <ArrowLeft size={18} /> Back
                    </Link>
                </div>

                <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl h-auto">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-8 text-left border-b pb-4 border-gray-200">
                            <h1 className="text-3xl font-extrabold text-gray-800 leading-tight tracking-tight">
                                Add <span className="text-blue-600">Company Project</span>
                            </h1>
                        </div>

                        <div className="flex flex-col space-y-10">

                            {/* Project Information */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-700 mb-4">Project Information</h2>
                                <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">

                                    <InputField label="Project Name" name="ProjectName" value={projectData.ProjectName} onChange={handleInputChange} error={errors.ProjectName} />

                                    <SingleSelect options={projectTypes} label="Project Type" value={projectData.ProjectType} onChange={(val) => handleSelectChange("ProjectType", val)} />

                                    <SingleSelect options={projectStatuses} label="Project Status" value={projectData.ProjectStatus} onChange={(val) => handleSelectChange("ProjectStatus", val)} />

                                    <InputField label="City" name="City" value={projectData.City} onChange={handleInputChange} error={errors.City} />

                                    <InputField label="Location" name="Location" value={projectData.Location} onChange={handleInputChange} error={errors.Location} />

                                    <InputField label="Area" name="Area" value={projectData.Area} onChange={handleInputChange} />

                                    <InputField label="Address" name="Address" value={projectData.Address} onChange={handleInputChange} />

                                    <InputField label="Range" name="Range" value={projectData.Range} onChange={handleInputChange} />

                                    <InputField label="Amenities" name="Amenities" value={projectData.Amenities} onChange={handleInputChange} />

                                    <InputField label="Facilities" name="Facilities" value={projectData.Facilities} onChange={handleInputChange} />

                                    <TextAreaField label="Description" name="Description" value={projectData.Description} onChange={handleInputChange} />

                                    <InputField label="Video" name="Video" value={projectData.Video} onChange={handleInputChange} />

                                    <InputField label="Google Map" name="GoogleMap" value={projectData.GoogleMap} onChange={handleInputChange} />

                                    {/* Customer Images */}
                                    {projectData.CustomerImages.map((img, idx) => (
                                        <div key={idx} className="flex gap-2 items-center">
                                            <InputField label={`Customer Image Title ${idx + 1}`} name={`CustomerTitle${idx}`} value={img.title} onChange={(e) => handleCustomerImageChange(idx, "title", e.target.value)} />
                                            <input type="file" onChange={(e) => handleCustomerImageChange(idx, "file", e.target.files?.[0] || null)} className="border p-2 rounded w-full" />
                                        </div>
                                    ))}

                                    {/* Site Plan */}
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Site Plan</label>
                                        <input type="file" onChange={(e) => handleSitePlanChange(e.target.files?.[0] || null)} className="border p-2 rounded w-full" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 w-32 rounded-md font-semibold hover:scale-105 transition-all"
                                >
                                    Save
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const InputField: React.FC<{
    label: string;
    name: string;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}> = ({ label, name, value, onChange, error }) => (
    <label className="relative block w-full">
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder=" "
            className={`peer w-full border rounded-sm bg-transparent py-3 px-4 outline-none 
        ${error ? "border-red-500 focus:border-red-500" : "border-gray-400 focus:border-blue-500"}`}
        />
        <p className={`absolute left-2 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      ${value || error ? "-top-2 text-xs text-blue-500" : "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500"}`}>
            {label}
        </p>
        {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}
    </label>
);

const TextAreaField: React.FC<{
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}> = ({ label, name, value, onChange }) => (
    <label className="relative block w-full">
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder=" "
            className="peer w-full border rounded-sm bg-transparent py-3 px-4 outline-none h-24"
        />
        <p className="absolute left-2 bg-white px-1 text-gray-500 text-sm transition-all duration-300
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500">
            {label}
        </p>
    </label>
);
