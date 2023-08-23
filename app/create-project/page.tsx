import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentuser } from "@/lib/session";
import { redirect } from "next/navigation";
const CreateProject = async () => {
  const session = await getCurrentuser();

  if (!session?.user) redirect("/");
  return (
    <Modal>
      <h3 className="modal-head-text">
        Create a new project
        <ProjectForm type="create" session={session} />
      </h3>
    </Modal>
  );
};

export default CreateProject;
