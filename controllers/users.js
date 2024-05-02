import { db } from "../database/setup.js";
import { users } from "../database/schema.js";
import { eq } from "drizzle-orm";

export const index = async (req, res, next) => {
  try {
    const allUsers = await db.select().from(users);
    return res.status(200).json({ success: true, data: allUsers });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: "Unable to get users" });
  }
};
export const store = async (req, res, next) => {
 const { name, email } = req.body;

 if (!name) {
   return res
     .status(400)
     .json({ success: false, data: null, message: "Name is required" });
 }

 if (!email) {
   return res
     .status(400)
     .json({ success: false, data: null, message: "Email is required" });
 }

 try {
   await db.insert(users).values({ name: name, email: email });

   return res.status(201).json({
     success: true,
     data: { name, email },
     message: "Added Successfully",
   });
 } catch (error) {
   return res
     .status(500)
     .json({ success: false, data: null, message: "Unable to add" });
 }
};

export const show = async (req, res, next) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, req.params.id));
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: "Unable to get users" });
  }
};

export const destroy = async (req, res, next) => {
 const { id } = req.params;

  try {
    await db.delete(users).where(eq(users.id, Number(id)));
    return res
      .status(200)
      .json({ success: true, message: "Delete Successfully" });
  } catch (error) {
    return res.status(500).json({ success: true, message: "Cannot Delete" });
  }
};

export const update = async (req, res, next) => {
  const { name, email } = req.body;
  const { id } = req.params;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide user_id to update" });
    }
    if (!name && !email) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide field to update" });
    }
    const updateData = {};

    if (name) {
      updateData.name = name;
    }
    if (email) {
      updateData.email = email;
    }
    await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, Number(id)));
    return res
      .status(200)
      .json({ success: true, message: "Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ success: true, message: "Cannot Update" });
  }
};
