const Mentors = {
  data: [],
  add: function (mentor) {
    if (typeof mentor !== "object") {
      throw new Error("data type must be an object");
    }
    this.data.push(mentor);

    return mentor;
  },
};

export { Mentors };
