'use client'

import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js'
import '@algolia/autocomplete-theme-classic';
import client from "@/app/lib/algolia";
import { useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';

export type AutocompleteItem = {
    name: string;
    objectID: string;
    email: string;
};

interface UserSearchProps {
    // eslint-disable-next-line no-unused-vars
    callback: (item: any) => Promise<any>;
}

export default function UserSearch({ callback }: UserSearchProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!containerRef.current) {
            return undefined;
        }

        const search = autocomplete<AutocompleteItem>({
            container: containerRef.current,
            placeholder: 'Search for a member',
            getSources({ query }) {
                return [
                    {
                        sourceId: 'users',
                        getItems() {
                            return getAlgoliaResults({
                                searchClient: client,
                                queries: [
                                    {
                                        indexName: 'users',
                                        query,
                                        params: {
                                            hitsPerPage: 5,
                                        },
                                    },
                                ],
                            });
                        },
                        templates: {
                            item({ item }) {
                                return item.email
                            },
                        },
                        getItemInputValue({ item }): string {
                            // return a string representation of the item
                            return item.email;
                        },
                        async onSelect({ item, setQuery }) {
                            setQuery('');
                            
                            await callback(item);                           

                            router.refresh();
                        },
                    }
                ]
            },
        });

        return () => {
            search.destroy();
        };
    }, [callback, router]);

    return (
        <div ref={containerRef}></div>
    );
}