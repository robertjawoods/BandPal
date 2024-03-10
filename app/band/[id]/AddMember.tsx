'use client'

import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js'
import '@algolia/autocomplete-theme-classic';
import client from "@/app/lib/algolia";
import { useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';

type AutocompleteItem = {
    name: string;
    objectID: string;
    email: string;
};

export default function AddMember({ bandId }: { bandId: string }) {
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

                            await fetch(`/api/band/${bandId}/add-member`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ userId: item.objectID }),
                            });

                            router.refresh();
                        },
                    }
                ]
            },
        });


        return () => {
            search.destroy();
        };
    }, []);

    return (
        <div ref={containerRef}></div>
    );
}