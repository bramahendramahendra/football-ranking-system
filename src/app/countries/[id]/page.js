/**
 * Country Detail Page
 * Display detailed country information
 */

'use client';

import { useEffect, useState } from 'react';
import { MainLayout, PageHeader } from '@/components/layout';
import { CountryDetail } from '@/components/countries';
import { Loading, ErrorState, Modal, ConfirmDialog, Tabs } from '@/components/common';
import { useCountry, useModal } from '@/hooks';
import { countriesAPI, matchesAPI } from '@/lib/api';
import { Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { CountryForm } from '@/components/countries';

export default function CountryDetailPage({ params }) {
  const router = useRouter();
  const { updateCountry, deleteCountry } = useApp();
  const { country, loading, error, refetch } = useCountry(params.id);
  
  const [rankingHistory, setRankingHistory] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const editModal = useModal();
  const deleteModal = useModal();

  useEffect(() => {
    if (country) {
      loadAdditionalData();
    }
  }, [country]);

  const loadAdditionalData = async () => {
    try {
      setLoadingData(true);
      const [historyRes, matchesRes] = await Promise.all([
        countriesAPI.getRankingHistory(params.id, 10),
        matchesAPI.getAll({ country_id: params.id, limit: 10 }),
      ]);

      setRankingHistory(historyRes.data?.history || []);
      setMatches(matchesRes.data || []);
    } catch (error) {
      console.error('Error loading additional data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleEdit = async (data) => {
    try {
      await updateCountry(params.id, data);
      editModal.close();
      refetch();
    } catch (error) {
      console.error('Error updating country:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCountry(params.id);
      router.push('/countries');
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loading message="Loading country details..." />
      </MainLayout>
    );
  }

  if (error || !country) {
    return (
      <MainLayout>
        <ErrorState 
          error={error}
          title="Country not found"
          retry={refetch}
        />
      </MainLayout>
    );
  }

  const tabs = [
    {
      label: 'Overview',
      content: (
        <CountryDetail 
          country={country}
          rankingHistory={rankingHistory}
        />
      ),
    },
    {
      label: 'Matches',
      content: (
        <div className="card-dark p-6">
          <h3 className="text-xl font-bold mb-4">Recent Matches</h3>
          {matches.length === 0 ? (
            <p className="text-dark-muted text-center py-8">No matches found</p>
          ) : (
            <div className="space-y-4">
              {matches.map(match => (
                <div key={match.id} className="flex items-center justify-between py-3 border-b border-dark-border last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{match.home_name}</span>
                      <span className="text-dark-muted">vs</span>
                      <span className="font-medium">{match.away_name}</span>
                    </div>
                    <p className="text-sm text-dark-muted">{match.competition_name || 'Friendly'}</p>
                  </div>
                  <div className="text-right">
                    {match.status === 'finished' ? (
                      <span className="text-xl font-bold">
                        {match.score_home} - {match.score_away}
                      </span>
                    ) : (
                      <span className="badge badge-info">{match.status}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <PageHeader
        breadcrumb={[
          { label: 'Countries', href: '/countries' },
          { label: country.name }
        ]}
        actions={
          <>
            <button onClick={() => router.back()} className="btn-secondary">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <button onClick={() => editModal.open(country)} className="btn-primary">
              <Edit className="w-5 h-5 mr-2" />
              Edit
            </button>
            <button onClick={() => deleteModal.open(country)} className="btn-danger">
              <Trash2 className="w-5 h-5 mr-2" />
              Delete
            </button>
          </>
        }
      />

      <Tabs tabs={tabs} />

      {/* Edit Modal */}
      <Modal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        title="Edit Country"
        size="large"
      >
        <CountryForm
          country={country}
          onSubmit={handleEdit}
          onCancel={editModal.close}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDelete}
        title="Delete Country"
        message={`Are you sure you want to delete ${country.name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </MainLayout>
  );
}