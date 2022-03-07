import http from "../http-common";

class EstudianteService {
  getAll() {
    return http.get("/studentCareer");
  }

  get(id) {
    return http.get("/studentCareer/" + id);
  }

  create(data) {
    return http.post("/studentCareer", data);
  }

  update(id, data) {
    return http.put("/studentCareer/" + id, data);
  }

  delete(id) {
    return http.delete("/studentCareer/" + id);
  }
}

export default new EstudianteService();
