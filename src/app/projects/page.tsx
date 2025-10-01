import { getAllProjects } from "@/lib/content";
import { ProjectsClient } from "./ProjectsClient";

export const metadata = {
  title: "Projects",
  description: "技術的なプロジェクトとその実装内容をご紹介します。",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return <ProjectsClient initialProjects={projects} />;
}
