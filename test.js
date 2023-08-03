

const createUser = async () => {
    try {
      const createUser = new user({
        name: "keyur",
        id: "tech lead",
        address: "nairobi",
        phone: 1234567890,
        centre: "nairovi",
        postcode: 123455,
      });
  
      const userData = await createUser.save();
    } catch (error) {
      console.log(error);
    }
  };
  
  createUser();