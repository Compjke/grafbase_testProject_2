import { ProjectInterface } from "@/common.types";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getProjectDetails } from "@/lib/actions";
import { getCurrentuser } from "@/lib/session";
import { redirect } from "next/navigation";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentuser();
  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };
  if (!session?.user) redirect("/");
  return (
    <Modal>
      <h3 className="modal-head-text">
        Edit project
        <ProjectForm type="edit" session={session} project={result?.project} />
      </h3>
    </Modal>
  );
};

export default EditProject;
