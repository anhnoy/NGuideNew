import API from "./api.service";

export default {
  async quotation_login(quo_id, phone, pass) {
    const url = `/login_quo?quo_id=${quo_id}&phone=${phone}&pass=${pass}`;
    return API().post(url);
  },
  async quotation_detail(quo_id) {
    const url = `/quotation/${quo_id}`; // quo_id as part of the path
    return API().get(url);
  },
};
