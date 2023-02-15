import http from "../http-common";

class SectionDataService {
  getAll(page = 0) {
    return http.get(`sections?page=${page}`);
  }

  get(id) {
    return http.get(`/sections/id/${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`sections?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    const response = fetch(`http://localhost:5000/api/v1/home/review`, {
      method: "POST",
      body: data,
    });

    return response;
  }

  createSection(data) {
    return http.post("/sections", data);
  }

  updateReview(data) {
    const response = fetch(`http://localhost:5000/api/v1/home/review`, {
      method: "PUT",
      body: data,
    });

    return response;
  }

  deleteReview(id, userId) {
    return http.delete(`/review?id=${id}`, {
      data: { user_id: userId },
    });
  }

  updateSection(data) {
    console.log(data);
    return http.put("/sections", data);
  }

  deleteSection(id, userId) {
    return http.delete(`/section?id=${id}`, {
      data: { user_id: userId },
    });
  }
}

export default new SectionDataService();
