"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectInterface, SessionInterface } from "@/common.types";
import Image from "next/image";
import FormField from "./FormFields";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { createProject, fetchToken, updateProject } from "@/lib/actions";

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: Props) => {
  const router = useRouter();
  const handleFomrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setisSubmiting(true);
      const { token } = await fetchToken();
      if (type === "create") {
        await createProject(form, session?.user?.id, token);
        router.refresh();
        router.push("/");
      }
      if (type === "edit") {
        await updateProject(form, project?.id as string, token);
        router.refresh();
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setisSubmiting(false);
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) alert("Please upload image file");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldname: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [fieldname]: value,
    }));
  };

  const [isSubmiting, setisSubmiting] = useState(false);

  const [form, setForm] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  return (
    <form onSubmit={handleFomrSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose an image for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            alt="image project"
            className="sm:p-10 object-contain z-20"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Type title for your project..."
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Your description...."
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://example.com"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        type="url"
        title="GitHub url"
        state={form.githubUrl}
        placeholder="https://github.com/yourname"
        setState={(value) => handleStateChange("githubUrl", value)}
      />
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div
        className={`
      flex
      items-center
      justify-start
      w-full
      max-md:justify-center
      `}
      >
        <Button
          title={
            isSubmiting
              ? `${type === "create" ? "Creating..." : "Editing..."}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmiting ? "" : "/plus.svg"}
          isSubmiting={isSubmiting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
