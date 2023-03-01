import { ListUsersCommand, ListAccessKeysCommand } from "@aws-sdk/client-iam"
import { IAMClient } from "@aws-sdk/client-iam"
const iamClient = new IAMClient({})

export const params = { MaxItems: 100 };

export const getAccessKeylist = async () => {
  try {
    const data = await iamClient.send(new ListAccessKeysCommand(params))
    const users = data.AccessKeyMetadata || [];
    users.forEach(function (user) {
      console.log("User " + user.UserName + " created", user.CreateDate);
    });
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

getAccessKeylist();