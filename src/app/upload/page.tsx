// src/app/upload/page.tsx
'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { uploadPinAction } from "@/actions/upload-pin-action";

export default function UploadPage() {
  const { data: session } = useSession();
  const [boards, setBoards] = useState<any[]>([]);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBoards() {
      if (!session?.accessToken) return;

      try {
        const response = await fetch("/api/pinterest/boards", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        
        if (response.ok) {
          const boardsData = await response.json();
          setBoards(boardsData);
          if (boardsData.length) setSelectedBoard(boardsData[0].id);
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    }

    fetchBoards();
  }, [session]);

  const handleUpload = async () => {
    if (!imageFile || !selectedBoard || !title) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      // First upload image to a temporary storage
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      
      if (!uploadData.imageUrl) {
        throw new Error("Failed to upload image");
      }

      // Then create the pin
      const result = await uploadPinAction({
        userId: session?.user?.id!,
        boardId: selectedBoard,
        title,
        description,
        imageUrl: uploadData.imageUrl,
        linkUrl: linkUrl || undefined,
      });

      if (result.success) {
        alert("Pin created successfully!");
        // Reset form
        setTitle("");
        setDescription("");
        setImageFile(null);
        setLinkUrl("");
      } else {
        alert("Failed to create pin: " + result.error);
      }
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Pinterest Uploader</h1>
        <p>Please sign in to upload pins</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Pinterest Pin</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select Board:</label>
          <select
            value={selectedBoard}
            onChange={(e) => setSelectedBoard(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {boards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Title *:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter pin title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Enter pin description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Link URL (optional):</label>
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="https://example.com"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading || !imageFile || !selectedBoard || !title}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded disabled:opacity-50"
        >
          {loading ? "Creating Pin..." : "Create Pin"}
        </button>
      </div>
    </div>
  );
}