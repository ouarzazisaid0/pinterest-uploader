// src/lib/pinterest-client.ts
import axios from "axios";

const PINTEREST_API_BASE = "https://api.pinterest.com/v5";

export class PinterestClient {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getBoards() {
    try {
      const response = await axios.get(`${PINTEREST_API_BASE}/boards`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        params: {
          page_size: 50,
        },
      });
      return response.data.items;
    } catch (error) {
      console.error("Error fetching boards:", error);
      throw error;
    }
  }

  async createPin(boardId: string, pinData: {
    title: string;
    description?: string;
    image_url: string;
    link?: string;
  }) {
    try {
      const response = await axios.post(
        `${PINTEREST_API_BASE}/pins`,
        {
          board_id: boardId,
          title: pinData.title,
          description: pinData.description || "",
          media_source: {
            source_type: "image_url",
            url: pinData.image_url,
          },
          ...(pinData.link && { link: pinData.link }),
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating pin:", error);
      throw error;
    }
  }
}