import { Injectable } from '@nestjs/common';
import { ListAccessKeysCommand } from "@aws-sdk/client-iam"
import { IAMClient } from "@aws-sdk/client-iam"

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getAWSOldAccesskey(q?: QueryType) {
    const iamClient = new IAMClient({})
    const params = { MaxItems: 100 };

    const hours = q?.period || 24 * 30

    try {
      const CurrentDate = new Date()
      const TartgetDate = new Date(CurrentDate.setHours(CurrentDate.getHours() - hours))
      
      const data = await iamClient.send(new ListAccessKeysCommand(params))
      const keysData = data.AccessKeyMetadata || [];
      
      const result = keysData
      .filter((key) => key.CreateDate > TartgetDate)
      .map((key) => {
        console.log("User " + key.UserName + " created", key.CreateDate);
        return {
          UserName: key.UserName, 
          AccessKeyID: key.AccessKeyId, 
          CreateDate: key.CreateDate}
      });
      console.log("reuslt", result)
      return result;
    } catch (err) {
      console.log("Error", err);
    }
  }
}

export interface QueryType
{
  period?: number
  type?: string // 시간이 아닌 년월일을 구분하려고 만들었음 
}
