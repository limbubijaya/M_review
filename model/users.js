const knex = require("../db");
const bcrypt = require("bcrypt");
const localUser = "local_user";
const googleUser = "google_user";

class LocalUser {
  static async createLocalUser(email, username, password) {
    const userExists = await knex(localUser).select("*").where("email", email);
    if (userExists.length !== 0) {
      return false;
    }

    //else
    const encryptedPassword = await bcrypt.hash(password, 10);

    const id = await knex(localUser).insert([
      {
        email: email,
        username: username,
        password: encryptedPassword,
        is_linked_to_google: false,
        admin: false,
      },
    ]);
    if (id != null) {
      return true;
    }
    return false;
  }

  static async updateUserGoogleLinkage(email, boolean) {
    await knex(localUser)
      .where({ email: email })
      .update({ is_linked_to_google: boolean });
  }

  static async loginLocalUser(email, password) {
    const user = await knex(localUser)
      .select("*")
      .where("email", email)
      .first();
    const isValidPassword = await bcrypt.compare(password, user.password);
    return { isValidPassword: isValidPassword, username: user.username };
  }

  static async loginGoogleUser(email, username, googleId) {
    const userExists = await knex(googleUser)
      .select("*")
      .where("email", email)
      .first();
    if (!userExists) {
      await this.createGoogleUser(email, username, googleId);
    }
    const userLocal = await knex(localUser)
      .select("*")
      .where("email", email)
      .first();
    if (userLocal) {
      if (userLocal.is_linked_to_google == true) {
        return true;
      } else {
        await this.updateUserGoogleLinkage(email, true);
      }
    } else {
      const randomPassword = this.generateWord();
      await this.createLocalUser(email, username, randomPassword);
      await this.updateUserGoogleLinkage(email, true);
    }
  }
  static async createGoogleUser(email, username, googleId) {
    const userExists = await knex(googleUser)
      .select("*")
      .where("email", email)
      .first();
    if (userExists) {
      return false;
    }
    const id = await knex(googleUser).insert([
      {
        email: email,
        username: username,
        google_id: googleId,
      },
    ]);
    if (id != null) {
      return true;
    }
    return false;
  }

  static async getEmail(userName) {
    try {
        const userId = await knex(localUser)
        .select("*")
        .where('username', userName)
        .first();
        return userId.email;
    } catch (error) {
        console.error('Error searching reviews:', error);
        throw error;
    }
}

  static generateWord() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let word = "";
    for (let i = 0; i < 10; i++) {
      word += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return word;
  }
}
module.exports = LocalUser;
