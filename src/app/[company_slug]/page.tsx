import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ company_slug: string }>;
}

export default async function CompanyPage({ params }: PageProps) {
  const { company_slug } = await params;
  redirect(`/${company_slug}/dashboard`);
}
