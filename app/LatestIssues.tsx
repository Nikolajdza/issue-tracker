import Link from 'next/link';
import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Table, Text } from '@radix-ui/themes';
import { IssueStatusBadge } from '@/app/components';

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      assignedToUser: true
    }
  });

  return (
    <Card>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.RowHeaderCell>
              <Text className="font-bold" size="4" mb="5">Latest Issues</Text>
            </Table.RowHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
