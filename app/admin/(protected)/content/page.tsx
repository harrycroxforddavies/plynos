import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/admin/PageHeader";
import { Table, THead, TR, TH, TD, EmptyRow } from "@/components/admin/Table";
import { NewContentForm } from "@/components/admin/content/NewContentForm";
import {
  PublishToggle,
  ContentDeleteButton,
} from "@/components/admin/content/ContentControls";
import { formatDateTime } from "@/lib/utils";
import type { ContentPost } from "@/types/database";

export const dynamic = "force-dynamic";
export const metadata = { title: "Content" };

export default async function ContentPage() {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("content_posts")
    .select("*")
    .order("created_at", { ascending: false });
  const posts = (data ?? []) as ContentPost[];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Content"
        description="Manage blog/news posts, portfolio entries and testimonials."
        actions={<NewContentForm />}
      />

      <Table>
        <THead>
          <TR>
            <TH>Created</TH>
            <TH>Type</TH>
            <TH>Title</TH>
            <TH>Slug</TH>
            <TH>Published</TH>
            <TH className="text-right">Actions</TH>
          </TR>
        </THead>
        <tbody>
          {posts.length === 0 ? (
            <EmptyRow cols={6} message="No content yet." />
          ) : (
            posts.map((p) => (
              <TR key={p.id}>
                <TD className="whitespace-nowrap text-plynos-slate">{formatDateTime(p.created_at)}</TD>
                <TD className="text-plynos-slate">{p.type}</TD>
                <TD className="font-medium">{p.title}</TD>
                <TD className="text-plynos-slate">/{p.slug}</TD>
                <TD>
                  <PublishToggle id={p.id} published={p.published} />
                </TD>
                <TD className="text-right">
                  <ContentDeleteButton id={p.id} />
                </TD>
              </TR>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
