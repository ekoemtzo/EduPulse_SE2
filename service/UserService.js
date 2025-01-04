'use strict';

/**
 * Get a user
 * US-8 Notification
 *
 * userId Long ID of the user
 * returns User
 **/
exports.getUser = function (userId) {
  return new Promise(function (resolve, _) {
    // Simulate a database lookup with mock data
    const mockUsers = [
      {
        userId: 1,
        username: "john_doe",
        isLoggedIn: true,
        isAdmin: false,
      },
      {
        userId: 2,
        username: "jane_doe",
        isLoggedIn: true,
        isAdmin: true,
      },
    ];

    const user = mockUsers.find((u) => u.userId === Number(userId));

    if (user) {
      resolve(user);
    } else {
      resolve(null); // Non-existent user
    }
  });
};
