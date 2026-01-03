"use client";
import { FormEvent, useState } from "react";

interface ProjectFormData {
  repoName: string;
  url: string;
}

type FormErrors = Partial<Record<keyof ProjectFormData, string>>;

export default function AddProject() {
  const [formData, setFormData] = useState<ProjectFormData>({
    repoName: "",
    url: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const repoRegex = /^[a-zA-Z0-9-]+\/[a-zA-Z0-9-._]+$/;
  const urlRegex =
    /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-._]+\/?$/;

  const validate = () => {
    let newErrors: FormErrors = {};

    if (!repoRegex.test(formData.repoName)) {
      newErrors.repoName = "Format must be 'username/repo'";
    }

    if (!urlRegex.test(formData.url)) {
      newErrors.url = "Must be a valid GitHub URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("/api/add-project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Success:", result);
        } else {
          console.error("Server error:", response.statusText);
        }
      } catch (e) {
        console.error("Network error:", e);
      }
    }
  };

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id as keyof ProjectFormData]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  return (
    <div className="mt-4 flex items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-md bg-neutral-900/40 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Add a project</h1>
          <p className="text-neutral-400 text-sm mt-1">
            Submit your repository details.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Repo Name Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="repoName"
              className="text-xs uppercase tracking-widest text-neutral-500 font-medium ml-1"
            >
              Repo Name
            </label>
            <input
              id="repoName"
              type="text"
              value={formData.repoName}
              onChange={handleChange}
              placeholder="novuhq/novu"
              className={`w-full bg-white/5 border ${
                errors.repoName ? "border-red-500/50" : "border-white/5"
              } rounded-xl p-3 px-4 outline-none focus:border-orange-500/50 transition-all placeholder:text-neutral-600`}
            />
            {errors.repoName && (
              <span className="text-red-500 text-[10px] ml-1 uppercase font-bold">
                {errors.repoName}
              </span>
            )}
          </div>

          {/* URL Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="url"
              className="text-xs uppercase tracking-widest text-neutral-500 font-medium ml-1"
            >
              GitHub URL
            </label>
            <input
              id="url"
              type="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://github.com/novuhq/novu"
              className={`w-full bg-white/5 border ${
                errors.url ? "border-red-500/50" : "border-white/5"
              } rounded-xl p-3 px-4 outline-none focus:border-orange-500/50 transition-all placeholder:text-neutral-600`}
            />
            {errors.url && (
              <span className="text-red-500 text-[10px] ml-1 uppercase font-bold">
                {errors.url}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
          >
            Submit Project
          </button>
        </form>
      </div>
    </div>
  );
}
