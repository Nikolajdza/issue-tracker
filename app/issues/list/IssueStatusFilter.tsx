'use client';

import { Select } from '@radix-ui/themes';
import { Status } from '.prisma/client';
import { useRouter } from 'next/navigation';

const statuses: { id: number, label: string, value?: Status }[] = [
  { id: 1, label: 'All' },
  { id: 2, label: 'Open', value: 'OPEN' },
  { id: 3, label: 'In Progress', value: 'IN_PROGRESS' },
  { id: 4, label: 'Closed', value: 'CLOSED' }
];

const IssueStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root onValueChange={(status) => {
      const query = status ? `?status=${status}` : '';
      router.push(`/issues/list${query}`);
    }}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map(status => (
          <Select.Item key={status.id} value={status.value || ''}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;