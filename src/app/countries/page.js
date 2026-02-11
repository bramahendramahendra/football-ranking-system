/**
 * Countries List Page
 * Display all countries with CRUD operations
 */

'use client';

import { useState, useEffect } from 'react';
import { MainLayout, PageHeader } from '@/components/layout';
import { CountryTable, CountryForm, CountryFilters } from '@/components/countries';
import { Loading, EmptyState, ErrorState, Modal, ConfirmDialog, Pagination } from '@/components/common';
import { useCountries, useModal } from '@/hooks';
import { useApp } from '@/contexts/AppContext';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CountriesPage() {
  const router = useRouter();
  const { createCountry, updateCountry, deleteCountry } = useApp();
  
  const [filters, setFilters] = useState({
    search: '',
    confederation: '',
    sortBy: 'world_ranking',
  });

  const [page, setPage] = useState(1);
  const limit = 20;

  const { countries, loading, error, pagination, fetchCountries, refetch } = useCountries({
    ...filters,
    page,
    limit,
  });

  const createModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();

  useEffect(() => {
    fetchCountries({ ...filters, page, limit });
  }, [filters, page]);

  const handleCreate = async (data) => {
    try {
      await createCountry(data);
      createModal.close();
      refetch();
    } catch (error) {
      console.error('Error creating country:', error);
    }
  };

  const handleEdit = async (data) => {
    try {
      await updateCountry(editModal.data.id, data);
      editModal.close();
      refetch();
    } catch (error) {
      console.error('Error updating country:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCountry(deleteModal.data.id);
      deleteModal.close();
      refetch();
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  const handleRowClick = (country) => {
    router.push(`/countries/${country.id}`);
  };

  return (
    <MainLayout>
      <PageHeader
        title="Countries"
        subtitle="Manage national teams and countries"
        breadcrumb={[
          { label: 'Countries' }
        ]}
        actions={
          <button onClick={() => createModal.open()} className="btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Add Country
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="card-dark p-6">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <CountryFilters filters={filters} onChange={setFilters} />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {loading && <Loading message="Loading countries..." />}

          {error && !loading && (
            <ErrorState error={error} retry={refetch} />
          )}

          {!loading && !error && countries.length === 0 && (
            <EmptyState
              title="No countries found"
              description="No countries match your filters. Try adjusting your search criteria."
              action={
                <button onClick={() => setFilters({ search: '', confederation: '', sortBy: 'world_ranking' })} className="btn-primary">
                  Clear Filters
                </button>
              }
            />
          )}

          {!loading && !error && countries.length > 0 && (
            <>
              <CountryTable 
                countries={countries}
                onRowClick={handleRowClick}
              />

              {/* Pagination */}
              <div className="mt-6">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={Math.ceil(pagination.total / pagination.limit)}
                  onPageChange={setPage}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={createModal.isOpen}
        onClose={createModal.close}
        title="Add New Country"
        size="large"
      >
        <CountryForm
          onSubmit={handleCreate}
          onCancel={createModal.close}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        title="Edit Country"
        size="large"
      >
        {editModal.data && (
          <CountryForm
            country={editModal.data}
            onSubmit={handleEdit}
            onCancel={editModal.close}
          />
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDelete}
        title="Delete Country"
        message={`Are you sure you want to delete ${deleteModal.data?.name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </MainLayout>
  );
}