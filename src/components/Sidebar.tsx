import axios from "axios";
import { useEffect, useState } from "react";

interface SidebarData {
    rendered: string;
    // Add other properties if there are any
}

const Sidebar = () => {
    const [sidebar, setSidebar] = useState<SidebarData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<SidebarData>('https://localhost/wordpress/wp-json/wp-rest-api-sidebars/v2/sidebars/sidebar-1');
                setSidebar(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {sidebar ? (
                <div dangerouslySetInnerHTML={{ __html: sidebar.rendered }} />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Sidebar;
