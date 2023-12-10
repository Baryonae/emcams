import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import supabase from './client';
import { useUser } from '@clerk/nextjs';

interface User {
  id: number;
  username: string;
  role: string;
  assignedMagazine: string;
}

function UserTable() {
    const { isLoaded, isSignedIn, user } = useUser();
  // Use optional type instead of any[] | null
    const [userData, setUserData] = useState<User[]>([]);
    async function getUserData() {

        const {data: magazine} = await supabase.from('users').select().eq('username', user?.firstName)
        
  }

  React.useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>

    </div>
  );
}

export default UserTable;
