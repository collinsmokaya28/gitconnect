import { FC } from 'react';
import Link from 'next/link';

interface Developer {
  $id: string;
  name: string;
  email: string;
  github: string;
  bio: string;
}

interface DeveloperListProps {
  developers: Developer[];
}

const DeveloperList: FC<DeveloperListProps> = ({ developers }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {developers.map((developer) => (
        <li key={developer.$id} className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold">{developer.name}</h2>
          <p>Email: {developer.email}</p>
          <p>Bio: {developer.bio}</p>
          <a
            href={`https://github.com/${developer.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            GitHub Profile
          </a>
          <div className="mt-2">
            <Link href={`/developers/${developer.$id}`}>
              <a className="text-blue-500">View Profile</a>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DeveloperList;

