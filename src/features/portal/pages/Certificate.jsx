import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Download, Share2, Shield, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import undaLogo from '@/assets/logos/unda-logo-main.jpg';
import { memberService, profileService } from '@/services/apiService';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose, DialogTrigger } from '@/components/ui/dialog';

const Certificate = () => {
    const [toast, setToast] = useState('');
    const [processing, setProcessing] = useState(false);
    const [profile, setProfile] = useState(null);
    const [certInfo, setCertInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showReissueDialog, setShowReissueDialog] = useState(false);

    const certRef = useRef(null);

    const handleDownload = async () => {
        if (!certInfo || !certInfo.issued) {
            setToast('Certificate not yet issued. Complete required training.');
            setTimeout(() => setToast(''), 3000);
            return;
        }
        setProcessing(true);
        try {
            const res = await memberService.downloadCertificate();
            const blob = new Blob([res.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const filename = (certInfo && certInfo.certificate_filename) || 'unda-certificate.pdf';
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (e) {
            console.error('Download failed', e);
            setToast('Unable to download certificate.');
            setTimeout(() => setToast(''), 3000);
        } finally {
            setProcessing(false);
        }
    };

    const handleShare = async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            setToast('Link copied to clipboard');
        } catch {
            setToast('Unable to copy link');
        }
        setTimeout(() => setToast(''), 3000);
    };

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const p = await profileService.getProfile();
                if (!mounted) return;
                setProfile(p.data || null);
            } catch (e) {
                console.debug('Profile fetch failed', e);
            }
            try {
                const c = await memberService.getMyCertificate();
                if (!mounted) return;
                setCertInfo(c.data || null);
            } catch (e) {
                // Certificate endpoint may not exist yet; don't fatal.
                console.debug('Certificate fetch failed', e);
                setCertInfo(null);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    const refreshCertificate = async () => {
        setLoading(true);
        try {
            const c = await memberService.getMyCertificate();
            setCertInfo(c.data || null);
        } catch (e) {
            console.debug('Certificate refresh failed', e);
            setCertInfo(null);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelCertificate = async () => {
        setProcessing(true);
        try {
            await memberService.cancelCertificate();
            setToast('Certificate cancelled successfully');
            setCertInfo(prev => ({ ...(prev||{}), issued: false }));
        } catch (e) {
            console.error('Cancel failed', e);
            setToast('Unable to cancel certificate');
        } finally {
            setProcessing(false);
            setShowCancelDialog(false);
            setTimeout(() => setToast(''), 3000);
        }
    };

    const handleRequestReissue = async () => {
        setProcessing(true);
        try {
            await memberService.requestCertificateReissue();
            setToast('Re-issue requested. You will be notified when ready.');
        } catch (e) {
            console.error('Reissue failed', e);
            setToast('Unable to request re-issue');
        } finally {
            setProcessing(false);
            setShowReissueDialog(false);
            setTimeout(() => setToast(''), 3000);
        }
    };
    return (
        <DashboardLayout headerContent={(
            <div className="max-w-7xl mx-auto px-6">
                <div className="rounded-3xl bg-white p-6 md:px-8 md:py-4 shadow-[0_20px_50px_rgba(0,194,203,0.08)] border border-[#00C2CB]/10">
                    <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-[#0B1E3B]">My Certificate</h2>
                    <p className="text-sm text-[#334155] mt-1">Proof of your commitment to mental resilience.</p>
                </div>
            </div>
        )}>
        <div className="flex flex-col xl:flex-row gap-8 items-start">
            
            {/* Certificate Preview */}
            <GlassCard className="flex-1 w-full p-4 md:p-8 rounded-2xl shadow-inner flex justify-center overflow-x-auto">
                <div ref={certRef} className="w-full max-w-3xl mx-auto bg-white shadow-2xl relative p-6 md:p-12 text-center flex flex-col justify-between border border-[#E6EEF2] overflow-hidden">
                    
                    {/* Decorative Background */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-5" 
                         style={{ backgroundImage: 'radial-gradient(#0c3b5e 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
                    />
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1e293b] via-[#00C2CB] to-[#1e293b]" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-3 mb-8 opacity-90">
                            <div className="h-12 w-12 grayscale opacity-90 bg-white/90 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                                <img src={undaLogo} alt="Logo" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-black text-[#1e293b] uppercase tracking-widest mb-3">Certificate</h2>
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-px bg-[#00C2CB] w-12" />
                            <p className="text-[#00C2CB] font-bold uppercase tracking-[0.2em] text-xs">Of Membership</p>
                            <div className="h-px bg-[#00C2CB] w-12" />
                        </div>
                    </div>

                    <div className="relative z-10 py-8">
                        <p className="text-[#334155] font-serif italic text-lg mb-6">This certifies that</p>
                        <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#1e293b] mb-2">{profile?.full_name || profile?.name || '—'}</h3>
                        <p className="text-sm font-bold text-[#334155] uppercase tracking-widest mb-8">Member ID: {profile?.member_id || profile?.id || '—'}</p>
                        
                        <p className="text-[#334155] max-w-xl mx-auto text-sm md:text-base leading-relaxed font-serif italic">
                            Is a recognized member of the Unda Youth Network, having demonstrated commitment to promoting mental health resilience and peer support within the community.
                        </p>
                    </div>

                    <div className="relative z-10 flex justify-between items-end mt-8 pt-8 border-t border-[#E6EEF2]">
                        <div className="text-left">
                            <div className="h-10 border-b border-black/20 mb-2 w-40 flex items-end">
                                <span className="font-signature text-xl text-[#1e293b]">Dr. Amani</span>
                            </div>
                            <p className="text-[10px] font-bold uppercase text-[#334155] tracking-widest">Program Director</p>
                        </div>
                        
                        {/* Seal */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                            <div className="h-24 w-24 rounded-full border-4 border-[#F59E0B]/30 bg-white shadow-sm flex items-center justify-center relative">
                                <div className="absolute inset-2 border border-[#F59E0B]/20 rounded-full" />
                                <Award size={32} className="text-[#F59E0B]" />
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-[10px] font-bold uppercase text-[#334155] tracking-widest mb-1">Date</p>
                            <p className="font-bold text-[#1e293b] text-sm">{(certInfo && certInfo.issued_at) ? new Date(certInfo.issued_at).toLocaleDateString() : '—'}</p>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Actions Sidebar */}
            <div className="w-full xl:w-80 space-y-6">
                        <GlassCard className="p-6">
                    <h3 className="font-bold text-[#1e293b] mb-4 text-sm uppercase tracking-wide">Actions</h3>
                    <div className="space-y-3">
                        <Button
                            onClick={handleDownload}
                            aria-label="Download certificate"
                            disabled={processing || !(certInfo && certInfo.issued && certInfo.trainings_completed)}
                            className={`w-full ${processing ? 'opacity-70 cursor-wait' : ''} bg-gradient-to-r from-[#00C2CB] to-[#0090C0] text-white rounded-xl shadow-lg shadow-[0_8px_30px_rgba(0,194,203,0.06)] font-bold flex items-center gap-2 ${!(certInfo && certInfo.issued && certInfo.trainings_completed) ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <Download size={16} /> {processing ? 'Preparing...' : 'Download / Print'}
                        </Button>

                        {!certInfo || !certInfo.trainings_completed ? (
                            <div className="text-xs text-[#334155]">
                                Certificate is issued only after required training is completed. <a href="/member/events" className="font-bold text-amber-500 hover:underline">View training sessions</a>
                            </div>
                        ) : null}
                        <div className="flex gap-2">
                            <Button onClick={refreshCertificate} variant="outline" aria-label="Refresh certificate status" className="flex-1 rounded-xl font-bold flex items-center gap-2 text-[#334155] hover:text-[#1e293b] dark:hover:text-white border-[#E6EEF2]">
                                Check Eligibility
                            </Button>
                            <Button onClick={() => setShowReissueDialog(true)} variant="ghost" aria-label="Request reissue" className="rounded-xl font-bold flex items-center gap-2 text-[#334155] hover:text-[#1e293b] dark:hover:text-white border-[#E6EEF2]">
                                Request Re-issue
                            </Button>
                        </div>

                        <Button onClick={handleShare} variant="outline" aria-label="Share certificate link" className="w-full rounded-xl font-bold flex items-center gap-2 text-[#334155] hover:text-[#1e293b] dark:hover:text-white border-[#E6EEF2]">
                            <Share2 size={16} /> Share Link
                        </Button>
                    </div>
                </GlassCard>

                <div className="bg-white/90 p-6 rounded-2xl text-[#1e293b] relative overflow-hidden shadow">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00C2CB]/10 rounded-full blur-2xl" />
                    
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#F0F7FF] rounded-lg">
                            <Shield size={20} className="text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Verified Member</h3>
                            <p className="text-[10px] text-[#334155]">Since Jan 2024</p>
                        </div>
                        {toast && (
                            <div className="fixed top-8 right-8 z-50 bg-white text-[#1e293b] px-4 py-2 rounded-md shadow-lg">
                                {toast}
                            </div>
                        )}
                    </div>
                    
                        <div className="space-y-3">
                        <div className="flex justify-between text-xs text-[#334155]">
                            <span>Certificate</span>
                            <span className="font-bold text-emerald-600">{certInfo && certInfo.issued ? 'Issued' : (loading ? 'Checking' : 'Not issued')}</span>
                        </div>
                        <div className="flex justify-between text-xs text-[#334155]">
                            <span>Training Complete</span>
                            <span className="font-bold text-amber-500">{certInfo && typeof certInfo.trainings_completed !== 'undefined' ? (certInfo.trainings_completed ? 'Yes' : 'No') : (loading ? 'Checking' : 'Unknown')}</span>
                        </div>
                        <div className="flex justify-between text-xs text-[#334155]">
                            <span>Issued On</span>
                            <span className="font-bold">{certInfo && certInfo.issued_at ? new Date(certInfo.issued_at).toLocaleDateString() : '—'}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* Cancel Certificate Confirmation Dialog */}
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cancel Certificate</DialogTitle>
                    <DialogDescription>Are you sure you want to cancel (revoke) your certificate? This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setShowCancelDialog(false)}>Close</Button>
                    <Button onClick={handleCancelCertificate} className="bg-rose-600 text-white">Yes, Cancel Certificate</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Request Re-issue Confirmation Dialog */}
        <Dialog open={showReissueDialog} onOpenChange={setShowReissueDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Request Certificate Re-issue</DialogTitle>
                    <DialogDescription>Requesting a re-issue will create a new certificate if you meet eligibility. Proceed?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setShowReissueDialog(false)}>Cancel</Button>
                    <Button onClick={handleRequestReissue} className="bg-amber-500 text-white">Request Re-issue</Button>
                </DialogFooter>
            </DialogContent>
                </Dialog>
        </DashboardLayout>
  );
};

export default Certificate;
