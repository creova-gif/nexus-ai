import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAppStore } from "../store";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Shield, CheckCircle, XCircle, FileText, Search, AlertTriangle, User } from "lucide-react";

export default function KycOnboarding() {
  const { kycProfiles, updateKycStatus } = useAppStore();
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(kycProfiles[0]?.id || null);

  const selectedProfile = kycProfiles.find(p => p.id === selectedProfileId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-[var(--teal)] bg-[rgba(45,212,191,.15)]';
      case 'rejected': return 'text-[var(--coral)] bg-[rgba(248,113,113,.15)]';
      default: return 'text-[var(--amber)] bg-[rgba(251,191,36,.15)]';
    }
  };

  return (
    <DashboardLayout pageTitle="KYC Onboarding" breadcrumb="Perpetual KYC">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
        
        {/* Left List: KYC Profiles */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-white font-['Instrument_Serif']">Pending Verifications</h2>
            <span className="text-xs text-[var(--text-purple-2)]">{kycProfiles.length} profiles</span>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto pr-2 pb-10">
            {kycProfiles.map(profile => (
              <Card 
                key={profile.id} 
                className={`glass border-[0.5px] p-4 cursor-pointer transition-all ${selectedProfileId === profile.id ? 'border-[var(--border-purple)] bg-[var(--glass2)]' : 'border-[var(--border)] hover:border-[var(--border2)]'}`}
                onClick={() => setSelectedProfileId(profile.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${profile.type === 'business' ? 'bg-[rgba(99,102,241,.15)] text-indigo-400' : 'bg-[rgba(168,85,247,.15)] text-purple-400'}`}>
                      {profile.type === 'business' ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{profile.name}</h3>
                      <p className="text-[0.65rem] text-[var(--text-purple-3)] uppercase tracking-wider">{profile.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[0.6rem] font-bold uppercase ${getStatusColor(profile.status)}`}>
                    {profile.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t-[0.5px] border-[var(--border)]">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[var(--text-purple-2)]" />
                    <span className="text-xs text-[var(--text-purple-2)]">Risk Score:</span>
                    <span className={`text-xs font-bold ${profile.riskScore > 75 ? 'text-[var(--coral)]' : 'text-[var(--teal)]'}`}>{profile.riskScore}</span>
                  </div>
                  <div className="text-[0.65rem] text-[var(--text-purple-3)]">
                    {profile.documents.filter(d => d.status === 'verified').length} / {profile.documents.length} Docs
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Detail: Document Review */}
        <div className="w-full lg:w-2/3">
          {selectedProfile ? (
            <Card className="glass border-[0.5px] border-[var(--border)] h-full flex flex-col overflow-hidden">
              <div className="px-6 py-5 border-b-[0.5px] border-[var(--border)] flex justify-between items-center bg-[var(--glass2)]">
                <div>
                  <h2 className="text-xl font-bold text-white font-['Instrument_Serif']">{selectedProfile.name}</h2>
                  <p className="text-sm text-[var(--text-purple-2)] flex items-center gap-2">
                    <span className="uppercase text-[0.65rem] tracking-wider font-bold">{selectedProfile.type} Entity</span>
                    <span>•</span>
                    <span>{selectedProfile.id}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="glass border-[var(--coral)] text-[var(--coral)] hover:bg-[rgba(248,113,113,.1)]"
                    onClick={() => updateKycStatus(selectedProfile.id, 'rejected')}
                  >
                    Reject Profile
                  </Button>
                  <Button 
                    size="sm" 
                    className="gradient-purple text-white border-none"
                    onClick={() => updateKycStatus(selectedProfile.id, 'verified')}
                  >
                    Approve KYC
                  </Button>
                </div>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <h3 className="text-sm font-bold text-[var(--text-purple-2)] mb-4 uppercase tracking-widest font-['Geist_Mono']">Document Verification</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProfile.documents.map((doc, idx) => (
                    <div key={idx} className="border-[0.5px] border-[var(--border)] rounded-lg p-4 bg-[var(--bg1)]">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[var(--brand-hi)]" />
                          <h4 className="text-sm font-semibold text-white">{doc.type}</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[0.6rem] font-bold uppercase ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                      
                      <div className="aspect-[4/3] w-full bg-[#0a0a0f] rounded border-[0.5px] border-[var(--border)] flex items-center justify-center mb-4 relative overflow-hidden group">
                         <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <Search className="w-8 h-8 text-[var(--text-purple-2)]" />
                         </div>
                         <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                            <Button size="sm" variant="outline" className="h-7 text-[0.65rem]">View Document</Button>
                         </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 h-7 text-[0.65rem] glass border-[var(--teal)] text-[var(--teal)]">
                          <CheckCircle className="w-3 h-3 mr-1" /> Valid
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 h-7 text-[0.65rem] glass border-[var(--coral)] text-[var(--coral)]">
                          <XCircle className="w-3 h-3 mr-1" /> Invalid
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border-[0.5px] border-dashed border-[var(--border)] rounded-xl">
              <p className="text-[var(--text-purple-2)]">Select a profile to review documents.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
