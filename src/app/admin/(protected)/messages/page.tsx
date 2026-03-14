import prisma from "@/lib/prisma";
import MessagesTable from "@/components/admin/MessagesTable";

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-(--color-text) dark:text-(--color-text-dark)">
        Messages
      </h1>
      <MessagesTable messages={messages} />
    </div>
  );
}
