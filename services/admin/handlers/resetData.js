import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE
    ? {
        endpoint: "http://localhost:8000",
      }
    : {}
);

const resetIds = [
  "MD-22-0018",
  "MD-22-0019",
  "MD-22-0020",
  "MD-22-0021",
  "MD-22-0022",
  "MD-22-0023",
  "MD-22-4234",
  "MD-22-0283-9434",
  "MD.12896",
  "MD.12893",
  "MD.12958",
  "MD.38430",
  "MD.123456",
  "MD-12896.R00.00",
  "MD-12893.R00.00",
  "MD-12958.R00.00",
  "MD-39253.R00.00",
  "MD-38430.R00.00",
  "MD-33463.R00.00",
  "MD-39263.R00.00",
  "MD-123456.R00.00",
  "MD.33463.R00.00",
  "MD.39253.R00.00",
  "MD.33463.R00.TE00",
  "MD.33463.R00.TE01",
  "MD.33463.R00.TE02",
  "MD-12893.R00.TE01",
  "MD-5533.R01.00",
  "MD-5533.R02.00",
  "MD-5533.R03.00",
  "MD-5533.R00.01",
  "MD-5533.R00.02",
  "MD-5533.R00.03",
  "MD-5533.R00.04",
  "MD-5533.R00.TE00",
  "MD-5533.R00.TE01",
  "MD-5533.R00.TE02",
  "MD-5533.R00.TE03",
  "MD-5533.R00.TE04",
  "MD-5533.R00.TE05",
  "MD-5533.R00.TE06",
  "MD-5533.R00.TE07",
  "MD-5533.R00.TE08",
  "MD-5533.R00.TE09",
  "MD-10330.R00.12",
  "MD-22106.R01.02",
];

const snapshotIds = [
  "MD-22-2300-VM",
  "MD-22-2301-VM",
  "MD-22-2302-VM",
  "MD-22-2303-VM",
  "MD-22-4441-VM",
  "MD-22-2305-VM",
  "MD-22-2306-VM",
  "MD-22-2307-VM",
  "MD-23-3333-VM",
  "MD-22-2201-VM",
  "MD-22-2202-VM",
  "MD-22-2203-VM",
  "MD-22-2204-VM",
  "MD-23-3331-VM",
  "MD-23-4441-VM",
  "MD-22-2206-VM",
  "MD-22-2207-VM",
  "MD-23-7650-VM ",
  "MD-22-2401-VM",
  "MD-23-7652-VM",
  "MD-22-2400-VM",
  "MD-22116.R00.00",
  "MD-22204.R00.00",
  "MD-22116.R01.00",
  "MD-22204.R01.00",
  "MD-22958.R00.02 ",
  "MD-22958.R00.01",
  "MD-22204.R00.02",
  "MD-22204.R00.01",
  "MD-22-2200-VM",
  "MD-12958.R00.02",
  "MD-22002.R00.00",
  "MD-22007.R00.00",
  "MD-22003.R00.00",
  "MD-22004.R00.00",
  "MD-22005.R00.00",
  "MD-22006.R00.00",
  "MD-2200.R00.00",
  "MD-22008.R00.00",
  "MD-22001.R01.00",
  "MD-22002.R01.00",
  "MD-22007.R01.00",
  "MD-22003.R01.00",
  "MD-22005.R01.00",
  "MD-22006.R01.00",
  "MD-22004.R01.00",
  "MD-22008.R01.00",
  "MD-12958.R01.00",
  "MD-22001.R00.01",
  "MD-22006.R00.01",
  "MD-22005.R00.01",
  "MD-22001.R01.01",
  "MD-22003.R01.01",
  "MD-22005.R01.02",
  "MD-22007.R00.01",
  "MD-22008.R01.01",
  "MD-22100.R01.01",
  "MD-22100.R00.01",
  "MD-22103.R00.01",
  "MD-22101.R00.01",
  "MD-22102.R01.01",
  "MD-22102.R00.01",
  "MD-22101.R01.01",
  "MD-22103.R01.01",
  "MD-0645.R00.00",
  "MD-9996",
  "MD-40198.R02",
  "MD-0645.R01",
  "MD-0265.R04.02",
  "MD-40198.R02.01",
  "MD-01.000",
  "MD-9995",
  "MD.20230",
  "MD.2233",
  "MD-02.R00.M04",
  "MD-21-0999-SID",
];

// const undoAdminChanges = [
//   {
//     clockEndTimestamp: 1697123859496,
//     componentType: "chipsparai",
//     eventTimestamp: 1673709577000,
//     transmittalNumberWarningMessage: "",
//     currentStatus: "Submitted",
//     parentId: "MD-22-2401-VM",
//     attachments: [
//       {
//         filename: "Screenshot 2023-03-31 at 4.46.08 PM.png",
//         s3Key: "1689347857918/Screenshot 2023-03-31 at 4.46.08 PM.png",
//         title: "RAI Response",
//         contentType: "image/png",
//         url: "https://uploads-oy2-22413-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3Abecb694d-f091-42c5-a7b5-d9a974b1c9f6/1689347857918/Screenshot%202023-03-31%20at%204.46.08%20PM.png",
//       },
//     ],
//     parentType: "chipspa",
//     GSI1sk: "MD-22-2401-VM",
//     additionalInformation: "Here is the official RAI Response",
//     submissionTimestamp: 1673709577000,
//     GSI1pk: "OneMAC#submitchipsparai",
//     submitterEmail: "statesubmitter@nightwatch.test",
//     territory: "MD",
//     sk: "OneMAC#1673709577000",
//     componentId: "MD-22-2401-VM",
//     pk: "MD-22-2401-VM",
//     submitterName: "StateSubmitter Nightwatch",
//   },
//   {
//     clockEndTimestamp: 1697123859496,
//     componentType: "medicaidsparai",
//     eventTimestamp: 1675987200000,
//     transmittalNumberWarningMessage: "",
//     currentStatus: "Submitted",
//     parentId: "MD-22-2400-VM",
//     attachments: [
//       {
//         filename: "Screenshot 2023-03-31 at 4.46.08 PM.png",
//         s3Key: "1689347857918/Screenshot 2023-03-31 at 4.46.08 PM.png",
//         title: "RAI Response",
//         contentType: "image/png",
//         url: "https://uploads-oy2-22413-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3Abecb694d-f091-42c5-a7b5-d9a974b1c9f6/1689347857918/Screenshot%202023-03-31%20at%204.46.08%20PM.png",
//       },
//     ],
//     parentType: "medicaidspa",
//     GSI1sk: "MD-22-2400-VM",
//     additionalInformation: "Here is the official RAI Response",
//     submissionTimestamp: 1675987200000,
//     GSI1pk: "OneMAC#submitmedicaidsparai",
//     submitterEmail: "statesubmitter@nightwatch.test",
//     territory: "MD",
//     sk: "OneMAC#1675987200000",
//     componentId: "MD-22-2400-VM",
//     pk: "MD-22-2400-VM",
//     submitterName: "StateSubmitter Nightwatch",
//   },
//   {
//     clockEndTimestamp: 1680725910479,
//     componentType: "waiverrai",
//     eventTimestamp: 1672953510479,
//     currentStatus: "Submitted",
//     originallyFrom: "cms-spa-form-master-change-requests",
//     parentId: "MD-22204.R00.00",
//     attachments: [
//       {
//         s3Key: "1672953505887/PackagelistView_ExcelExport_Issues.xlsx",
//         filename: "PackagelistView_ExcelExport_Issues.xlsx",
//         title: "Waiver RAI Response",
//         contentType:
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         url: "https://uploads-master-attachments-989324938326.s3.us-east-1.amazonaws.com/protected/us-east-1%3Ac052f1db-9f55-42aa-9d43-2d957bfc754b/1672953505887/PackagelistView_ExcelExport_Issues.xlsx",
//       },
//     ],
//     parentType: "waivernew",
//     proposedEffectiveDate: "-- --",
//     GSI1sk: "MD-22204.R00.00",
//     additionalInformation:
//       "Jan 5 did the rai response for this waiver to verify the migration process.",
//     submissionTimestamp: 1672953510479,
//     GSI1pk: "OneMAC#submitwaiverrai",
//     convertTimestamp: 1674854067202,
//     submitterEmail: "statesystemadmin@nightwatch.test",
//     sk: "OneMAC#1672953510479",
//     componentId: "MD-22204.R00.00",
//     pk: "MD-22204.R00.00",
//     submitterName: "undefined undefined",
//   },
//   {
//     clockEndTimestamp: 1680725910479,
//     componentType: "waiverrai",
//     eventTimestamp: 1672953510479,
//     currentStatus: "Submitted",
//     originallyFrom: "cms-spa-form-master-change-requests",
//     parentId: "MD-22204.R01.00",
//     attachments: [
//       {
//         s3Key: "1672953505887/PackagelistView_ExcelExport_Issues.xlsx",
//         filename: "PackagelistView_ExcelExport_Issues.xlsx",
//         title: "Waiver RAI Response",
//         contentType:
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         url: "https://uploads-master-attachments-989324938326.s3.us-east-1.amazonaws.com/protected/us-east-1%3Ac052f1db-9f55-42aa-9d43-2d957bfc754b/1672953505887/PackagelistView_ExcelExport_Issues.xlsx",
//       },
//     ],
//     parentType: "waiverrenewal",
//     proposedEffectiveDate: "-- --",
//     GSI1sk: "MD-22204.R01.00",
//     additionalInformation:
//       "Jan 5 did the rai response for this waiver to verify the migration process.",
//     submissionTimestamp: 1672953510479,
//     GSI1pk: "OneMAC#submitwaiverrai",
//     convertTimestamp: 1674854067202,
//     submitterEmail: "statesystemadmin@nightwatch.test",
//     sk: "OneMAC#1672953510479",
//     componentId: "MD-22204.R01.00",
//     pk: "MD-22204.R01.00",
//     submitterName: "undefined undefined",
//   },
//   {
//     clockEndTimestamp: 1680725910479,
//     componentType: "waiverrai",
//     eventTimestamp: 1672953510479,
//     currentStatus: "Submitted",
//     originallyFrom: "cms-spa-form-master-change-requests",
//     parentId: "MD-22204.R00.01",
//     attachments: [
//       {
//         s3Key: "1672953505887/PackagelistView_ExcelExport_Issues.xlsx",
//         filename: "PackagelistView_ExcelExport_Issues.xlsx",
//         title: "Waiver RAI Response",
//         contentType:
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         url: "https://uploads-master-attachments-989324938326.s3.us-east-1.amazonaws.com/protected/us-east-1%3Ac052f1db-9f55-42aa-9d43-2d957bfc754b/1672953505887/PackagelistView_ExcelExport_Issues.xlsx",
//       },
//     ],
//     parentType: "waiveramendment",
//     proposedEffectiveDate: "-- --",
//     GSI1sk: "MD-22204.R01.01",
//     additionalInformation:
//       "Jan 5 did the rai response for this waiver to verify the migration process.",
//     submissionTimestamp: 1672953510479,
//     GSI1pk: "OneMAC#submitwaiverrai",
//     convertTimestamp: 1674854067202,
//     submitterEmail: "statesystemadmin@nightwatch.test",
//     sk: "OneMAC#1672953510479",
//     componentId: "MD-22204.R01.01",
//     pk: "MD-22204.R01.01",
//     submitterName: "undefined undefined",
//   },
//   {
//     pk: "MD-0023.R06.02",
//     sk: "OneMAC#1690813644714",
//     additionalInformation: "RAI Response Withdrawal Test.",
//     adminChanges: [],
//     attachments: [
//       {
//         contentType: "text/plain",
//         filename: "textnotes.txt",
//         s3Key: "1690813643025/textnotes.txt",
//         title: "1915(c) Appendix K RAI Response",
//         url: "https://uploads-oy2-24562-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A952f55fb-36e1-425e-97e9-a1f1d0317daf/1690813643025/textnotes.txt",
//       },
//     ],
//     clockEndTimestamp: 1698589644714,
//     componentId: "MD-0023.R06.02",
//     componentType: "waiverappkrai",
//     currentStatus: "Submitted",
//     eventTimestamp: 1690813644714,
//     GSI1pk: "OneMAC#submitwaiverappkrai",
//     GSI1sk: "MD-0023.R06.02",
//     parentId: "MD-0023.R06.02",
//     parentType: "waiverappk",
//     submissionTimestamp: 1690813644714,
//     submitterEmail: "statesubmitter@nightwatch.test",
//     submitterName: "StateSubmitter Nightwatch",
//     territory: "MD",
//     transmittalNumberWarningMessage: "",
//   },
//   {
//     pk: "MD-2200.R00.10",
//     sk: "OneMAC#1675766233000",
//     additionalInformation: "RAI Response to withdraw.",
//     adminChanges: [],
//     attachments: [
//       {
//         contentType:
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         filename: "excel.xlsx",
//         s3Key: "1690811753124/excel.xlsx",
//         title: "Waiver RAI Response",
//         url: "https://uploads-oy2-24636-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A1cdd699c-f936-49b4-9f01-c4f4e8cfa595/1690811753124/excel.xlsx",
//       },
//     ],
//     clockEndTimestamp: 1698587754795,
//     componentId: "MD-2200.R00.10",
//     componentType: "waiverrai",
//     currentStatus: "Submitted",
//     eventTimestamp: 1675766233000,
//     GSI1pk: "OneMAC#submitwaiverrai",
//     GSI1sk: "MD-2200.R00.10",
//     parentId: "MD-2200.R00.10",
//     parentType: "waiveramendment",
//     submissionTimestamp: 1675766233000,
//     submitterEmail: "statesubmitter@nightwatch.test",
//     submitterName: "StateSubmitter Nightwatch",
//     territory: "MD",
//     transmittalNumberWarningMessage: "",
//   },
//   {
//     clockEndTimestamp: 1680725910479,
//     componentType: "waiverappkrai",
//     eventTimestamp: 1672953510479,
//     currentStatus: "Submitted",
//     originallyFrom: "cms-spa-form-master-change-requests",
//     parentId: "MD-22958.R00.01",
//     attachments: [
//       {
//         s3Key: "1672953505887/PackagelistView_ExcelExport_Issues.xlsx",
//         filename: "PackagelistView_ExcelExport_Issues.xlsx",
//         title: "Waiver RAI Response",
//         contentType:
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         url: "https://uploads-master-attachments-989324938326.s3.us-east-1.amazonaws.com/protected/us-east-1%3Ac052f1db-9f55-42aa-9d43-2d957bfc754b/1672953505887/PackagelistView_ExcelExport_Issues.xlsx",
//       },
//     ],
//     parentType: "waiverappk",
//     proposedEffectiveDate: "-- --",
//     GSI1sk: "MD-22958.R00.01",
//     additionalInformation:
//       "Did the rai response for this waiver to verify the migration process.",
//     submissionTimestamp: 1672953510479,
//     GSI1pk: "OneMAC#submitwaiverappkrai",
//     convertTimestamp: 1674854067202,
//     submitterEmail: "statesystemadmin@nightwatch.test",
//     sk: "OneMAC#1672953510479",
//     componentId: "MD-22958.R00.01",
//     pk: "MD-22958.R00.01",
//     submitterName: "undefined undefined",
//   },
//   {
//     pk: "MD-23-7652-VM",
//     sk: "Package",
//     adminChanges: [
//       {
//         changeMade:
//           "Systemadmin Nightwatch has enabled State package action to withdraw Formal RAI Response",
//         changeReason:
//           "Allow the RAI Response withdraw in the automated testing.",
//         changeTimestamp: 1690980331889,
//       },
//     ],
//     approvedEffectiveDate: "-- --",
//     componentId: "MD-23-7652-VM",
//     componentType: "medicaidspa",
//     cpocEmail: '"Tester, Chester (CPOC)" <chesterT@example.gov>',
//     cpocName: "Chester Tester",
//     currentStatus: "RAI Response Withdraw Enabled",
//     description: "package to test RAI withdrawing",
//     GSI1pk: "OneMAC#spa",
//     GSI1sk: "MD-23-7652-VM",
//     lastEventTimestamp: 1690980331889,
//     latestRaiResponseTimestamp: 1690980331889,
//     proposedEffectiveDate: "-- --",
//     reverseChrono: [
//       {
//         action: "Submitted",
//         additionalInformation: "Here is the official RAI Response",
//         attachments: [
//           {
//             contentType: "image/png",
//             filename: "Screenshot 2023-03-31 at 4.46.08 PM.png",
//             s3Key: "1689347857918/Screenshot 2023-03-31 at 4.46.08 PM.png",
//             title: "RAI Response",
//             url: "https://uploads-oy2-22413-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3Abecb694d-f091-42c5-a7b5-d9a974b1c9f6/1689347857918/Screenshot%202023-03-31%20at%204.46.08%20PM.png",
//           },
//         ],
//         currentStatus: "RAI Response Withdraw Enabled",
//         eventTimestamp: 1690980331889,
//         timestamp: 1673709577000,
//         type: "Formal RAI Response",
//       },
//       {
//         action: "Submitted",
//         additionalInformation: "test",
//         attachments: [
//           {
//             contentType:
//               "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//             filename: "excel.xlsx",
//             s3Key: "1672290671436/excel.xlsx",
//             title: "CMS Form 179",
//             url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A86a190fe-b195-42bf-9685-9761bf0ff14b/1672290671436/excel.xlsx",
//           },
//           {
//             contentType: "text/plain",
//             filename: "textnotes.txt",
//             s3Key: "1672290671438/textnotes.txt",
//             title: "SPA Pages",
//             url: "https://uploads-develop-attachments-116229642442.s3.us-east-1.amazonaws.com/protected/us-east-1%3A86a190fe-b195-42bf-9685-9761bf0ff14b/1672290671438/textnotes.txt",
//           },
//         ],
//         currentStatus: "Submitted",
//         eventTimestamp: 1672290673531,
//         timestamp: 1672290673531,
//         type: "Initial Package",
//       },
//     ],
//     reviewTeam: [
//       "Lester Tester",
//       "Super Tester",
//       "Jimmy Tester",
//       "Lester2 Tester",
//       "Super2 Tester",
//       "Jimmy2 Tester",
//     ],
//     reviewTeamEmailList: [
//       '"Tester, Lester (SRT)" <lesterT@example.gov>',
//       '"Tester, Super (SRT)" <SuperT@example.gov>',
//       '"Tester, Jimmy (SRT)" <jimmyT@example.gov>',
//       '"Tester, Lester2 (SRT)" <lesterT2@example.gov>',
//       '"Tester, Super2 (SRT)" <SuperT2@example.gov>',
//       '"Tester, Jimmy2 (SRT)" <jimmyT2@example.gov>',
//     ],
//     subject: "OneMac Connection test",
//     submissionTimestamp: 1673709577000,
//     submitterEmail: "statesubmitter@nightwatch.test",
//     submitterName: "StateSubmitter Nightwatch",
//   },
//   {
//     pk: "MD-22116.R00.00",
//     sk: "Package",
//     adminChanges: [
//       {
//         changeMade:
//           "Systemadmin Nightwatch has enabled State package action to withdraw Formal RAI Response",
//         changeReason:
//           "Enable the withdrawing of the RAI Response for the Automated Tests.",
//         changeTimestamp: 1690982549456,
//       },
//     ],
//     approvedEffectiveDate: "-- --",
//     componentId: "MD-22116.R00.00",
//     componentType: "waivernew",
//     cpocEmail: '"Tester, Chester (CPOC)" <chesterT@example.gov>',
//     cpocName: "Chester Tester",
//     currentStatus: "RAI Response Withdraw Enabled",
//     description: "package to test RAI withdrawing",
//     GSI1pk: "OneMAC#waiver",
//     GSI1sk: "MD-22116.R00.00",
//     lastEventTimestamp: 1690982549456,
//     latestRaiResponseTimestamp: 1690982549456,
//     proposedEffectiveDate: "-- --",
//     reverseChrono: [
//       {
//         action: "Submitted",
//         additionalInformation: "Here is the official RAI Response",
//         attachments: [
//           {
//             contentType:
//               "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//             filename: "PackagelistView_ExcelExport_Issues.xlsx",
//             s3Key: "1672953505887/PackagelistView_ExcelExport_Issues.xlsx",
//             title: "Waiver RAI Response",
//             url: "https://uploads-master-attachments-989324938326.s3.us-east-1.amazonaws.com/protected/us-east-1%3Ac052f1db-9f55-42aa-9d43-2d957bfc754b/1672953505887/PackagelistView_ExcelExport_Issues.xlsx",
//           },
//         ],
//         currentStatus: "RAI Response Withdraw Enabled",
//         eventTimestamp: 1690982549456,
//         timestamp: 1673709577000,
//         type: "Formal RAI Response",
//       },
//       {
//         action: "Submitted",
//         additionalInformation: "test",
//         attachments: [
//           {
//             contentType:
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//             filename: "file.docx",
//             s3Key: "1672269864615/file.docx",
//             title:
//               "1915(b)(4) FFS Selective Contracting (Streamlined) waiver application pre-print (Initial, Renewal, Amendment)",
//             url: "https://uploads-master-attachments-989324938326.s3.us-east-1.amazonaws.com/protected/us-east-1%3A30413432-e223-4a6d-bfe1-7ed87236ff55/1672269864615/file.docx",
//           },
//         ],
//         currentStatus: "Submitted",
//         eventTimestamp: 1672290673531,
//         timestamp: 1672290673531,
//         type: "Initial Package",
//       },
//     ],
//     reviewTeam: [
//       "Lester Tester",
//       "Super Tester",
//       "Jimmy Tester",
//       "Lester2 Tester",
//       "Super2 Tester",
//       "Jimmy2 Tester",
//     ],
//     reviewTeamEmailList: [
//       '"Tester, Lester (SRT)" <lesterT@example.gov>',
//       '"Tester, Super (SRT)" <SuperT@example.gov>',
//       '"Tester, Jimmy (SRT)" <jimmyT@example.gov>',
//       '"Tester, Lester2 (SRT)" <lesterT2@example.gov>',
//       '"Tester, Super2 (SRT)" <SuperT2@example.gov>',
//       '"Tester, Jimmy2 (SRT)" <jimmyT2@example.gov>',
//     ],
//     subject: "OneMac Connection test",
//     submissionTimestamp: 1673709577000,
//     submitterEmail: "statesubmitter@nightwatch.test",
//     submitterName: "StateSubmitter Nightwatch",
//   },
// ];

/**
 * Reset test Data
 */

export const main = async (event) => {
  console.log("resetData event: ", event);

  const promiseItems = [];

  await Promise.all(
    resetIds.map(async (id) => {
      console.log("Checking for id: ", id);
      const qParams = {
        TableName: process.env.oneMacTableName,
        KeyConditionExpression: "pk = :inPk",
        ExpressionAttributeValues: {
          ":inPk": id,
        },
        ProjectionExpression: "pk,sk",
      };
      try {
        const results = await dynamoDb.query(qParams).promise();
        console.log("Found these results in One Table: ", results);
        for (const item of results.Items) {
          promiseItems.push({
            TableName: process.env.oneMacTableName,
            Key: {
              pk: item.pk,
              sk: item.sk,
            },
          });
        }
      } catch (e) {
        console.log("query error: ", e.message);
      }
    })
  );

  await Promise.all(
    snapshotIds.map(async (id) => {
      console.log("Checking for id: ", id);
      const qParams = {
        TableName: process.env.oneMacTableName,
        KeyConditionExpression: "pk = :inPk",
        ExpressionAttributeValues: {
          ":inPk": id,
        },
        ProjectionExpression: "pk,sk",
      };
      try {
        const results = await dynamoDb.query(qParams).promise();
        console.log("Found these results in One Table: ", results);
        for (const item of results.Items) {
          const [, eventTimestamp] = item.sk.split("#");
          if (eventTimestamp > 1676384054014)
            promiseItems.push({
              TableName: process.env.oneMacTableName,
              Key: {
                pk: item.pk,
                sk: item.sk,
              },
            });
        }
      } catch (e) {
        console.log("query error: ", e.message);
      }
    })
  );

  await Promise.all(
    promiseItems.map(async (deleteParams) => {
      try {
        console.log(`Delete Params are ${JSON.stringify(deleteParams)}`);

        await dynamoDb.delete(deleteParams).promise();
      } catch (e) {
        console.log("delete error: ", e.message);
      }
    })
  );
  console.log("lambda thinks " + promiseItems.length + " Items are deleted");

  // await Promise.all(
  //   undoAdminChanges.map(async (resetParams) => {
  //     try {
  //       console.log(
  //         `Reset Admin Changes Params are ${JSON.stringify(resetParams)}`
  //       );

  //       await dynamoDb
  //         .put({
  //           TableName: process.env.oneMacTableName,
  //           Item: resetParams,
  //         })
  //         .promise();
  //     } catch (e) {
  //       console.log("reset admin changes error: ", e.message);
  //     }
  //   })
  // );
  // console.log(
  //   "lambda thinks " +
  //     undoAdminChanges.length +
  //     " Items have the admin changes reset"
  // );

  return "Done";
};
