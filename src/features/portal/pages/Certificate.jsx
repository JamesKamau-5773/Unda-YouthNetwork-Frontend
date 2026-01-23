import React, { useState, useRef, useEffect } from 'react';
// Assuming you are using the new PortalLayout wrapper globally. 
// If not, you can wrap this content in <DashboardLayout> as before.
import { Download, Share2, Shield, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import undaLogo from '@/assets/logos/unda-logo-main.jpg';
import { memberService, profileService } from '@/services/apiService';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Certificate = () => {
    const [toast, setToast] = useState('');
    const [processing, setProcessing] = useState(false);
    const [profile, setProfile] = useState(null);
    const [certInfo, setCertInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showReissueDialog, setShowReissueDialog] = useState(false);

    const certRef = useRef(null);

    // --- API & HANDLERS (Unchanged logic, just keeping it functional) ---
    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const p = await profileService.getProfile();
                if (!mounted) return;
                setProfile(p.data || null);
            } catch (e) { console.debug('Profile fetch failed', e); }
            try {
                const c = await memberService.getMyCertificate();
                if (!mounted) return;
                setCertInfo(c.data || null);
            } catch (e) { setCertInfo(null); } 
            finally { if (mounted) setLoading(false); }
        })();
        return () => { mounted = false; };
    }, []);

    const handleDownload = async () => {
        if (!certInfo || !certInfo.issued) {
            showToast('Certificate not yet issued. Complete required training.');
            return;
        }
        setProcessing(true);
        try {
            const res = await memberService.downloadCertificate();
            const blob = new Blob([res.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = (certInfo && certInfo.certificate_filename) || 'unda-certificate.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (e) { showToast('Unable to download certificate.'); } 
        finally { setProcessing(false); }
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            showToast('Link copied to clipboard');
        } catch { showToast('Unable to copy link'); }
    };

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    const refreshCertificate = async () => {
        setLoading(true);
        try {
            const c = await memberService.getMyCertificate();
            setCertInfo(c.data || null);
        } catch (e) { setCertInfo(null); } 
        finally { setLoading(false); }
    };

    const handleRequestReissue = async () => {
        setProcessing(true);
        try {
            await memberService.requestCertificateReissue();
            showToast('Re-issue requested successfully.');
        } catch (e) { showToast('Unable to request re-issue'); } 
        finally {
            setProcessing(false);
            setShowReissueDialog(false);
        }
    };

    const handleCancelCertificate = async () => {
        setProcessing(true);
        try {
            await memberService.cancelCertificate();
            showToast('Certificate cancelled.');
            setCertInfo(prev => ({ ...(prev||{}), issued: false }));
        } catch (e) { showToast('Unable to cancel certificate'); } 
        finally {
            setProcessing(false);
            setShowCancelDialog(false);
        }
    };

    return (
        // Main Container: Matches Dashboard Layout
        <div className="w-full max-w-7xl mx-auto px-6 pt-8 pb-20">
            
            {/* --- HEADER --- */}
            <div className="rounded-[2rem] bg-white p-8 mb-8 shadow-sm border border-[#E0F7FA] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-[#0B1E3B]">My Certificate</h2>
                    <p className="text-sm text-[#00838F] font-medium mt-1">Proof of your commitment to mental resilience.</p>
                </div>
                {/* Status Pill */}
                <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${certInfo && certInfo.issued ? 'bg-[#E0F7FA] border-[#00ACC1] text-[#006064]' : 'bg-gray-50 border-gray-100 text-[#0B1E3B]'}`}>
                    <Shield size={16} className={certInfo && certInfo.issued ? 'text-[#00ACC1]' : 'text-gray-400'} />
                    <span className="text-xs font-bold uppercase tracking-wider">
                        {certInfo && certInfo.issued ? 'Certified Member' : 'Pending Certification'}
                    </span>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 items-start">
            
                {/* --- LEFT: CERTIFICATE PREVIEW (The Paper) --- */}
                {/* Replaced GlassCard with White Paper style */}
                <div className="flex-1 min-w-0 w-full bg-white p-4 md:p-8 rounded-[2rem] shadow-sm border border-[#E0F7FA] flex justify-center">
                    
                    <div ref={certRef} className="w-full max-w-3xl mx-auto bg-white shadow-xl relative p-8 md:p-16 text-center flex flex-col justify-between border border-[#E6EEF2] overflow-hidden aspect-[1/1.4] md:aspect-[1.4/1]">
                        
                        {/* Decorative Background Pattern */}
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
                             style={{ backgroundImage: 'radial-gradient(#00ACC1 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
                        />
                        {/* Top Bar Accent */}
                        <div className="absolute top-0 left-0 w-full h-3 bg-[#0B1E3B]" />
                        <div className="absolute top-3 left-0 w-full h-1 bg-[#00ACC1]" />

                        {/* Certificate Header */}
                        <div className="relative z-10">
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <div className="h-16 w-16 bg-white rounded-xl shadow-sm border border-[#E0F7FA] p-2">
                                    <img src={undaLogo} alt="Logo" className="w-full h-full object-contain" />
                                </div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#0B1E3B] uppercase tracking-widest mb-4">Certificate</h2>
                            <div className="flex items-center justify-center gap-4">
                                <div className="h-px bg-[#00ACC1] w-16" />
                                <p className="text-[#00ACC1] font-bold uppercase tracking-[0.3em] text-xs">Of Membership</p>
                                <div className="h-px bg-[#00ACC1] w-16" />
                            </div>
                        </div>

                        {/* Certificate Body */}
                        <div className="relative z-10 py-6">
                            <p className="text-[#00838F] font-serif italic text-lg mb-6">This certifies that</p>
                            
                            <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#0B1E3B] mb-2">
                                {profile?.full_name || profile?.name || '—'}
                            </h3>
                            
                            <p className="text-xs font-bold text-[#00ACC1] uppercase tracking-widest mb-8 bg-[#E0F7FA] inline-block px-4 py-1 rounded-full">
                                Member ID: {profile?.member_id || profile?.id || '—'}
                            </p>
                            
                            <p className="text-[#0B1E3B] max-w-lg mx-auto text-sm md:text-base leading-relaxed font-serif italic opacity-80">
                                Is a recognized member of the Unda Youth Network, having demonstrated commitment to promoting mental health resilience and peer support within the community.
                            </p>
                        </div>

                        {/* Certificate Footer */}
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end mt-8 pt-8 border-t border-[#E6EEF2]">
                            <div className="text-left">
                                <div className="h-12 border-b border-[#0B1E3B]/20 mb-2 w-48 flex items-end">
                                    <span className="font-serif text-xl text-[#0B1E3B] italic">Dr. Amani</span>
                                </div>
                                <p className="text-[10px] font-bold uppercase text-[#00838F] tracking-widest">Program Director</p>
                            </div>
                            
                            {/* Gold Seal */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                                <div className="h-24 w-24 rounded-full border-4 border-[#F59E0B]/20 bg-white shadow-md flex items-center justify-center relative">
                                    <div className="absolute inset-1 border border-[#F59E0B]/30 rounded-full" />
                                    <Award size={36} className="text-[#F59E0B]" />
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-[10px] font-bold uppercase text-[#00838F] tracking-widest mb-1">Date Issued</p>
                                <p className="font-bold text-[#0B1E3B] text-sm">
                                    {(certInfo && certInfo.issued_at) ? new Date(certInfo.issued_at).toLocaleDateString() : '—'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT: SIDEBAR ACTIONS --- */}
                <div className="w-full xl:w-80 space-y-6">
                    
                    {/* Action Card */}
                    <div className="bg-white p-6 rounded-[2rem] border border-[#E0F7FA] shadow-sm">
                        <h3 className="font-bold text-[#0B1E3B] mb-4 text-sm uppercase tracking-wide">Actions</h3>
                        
                        <div className="space-y-3">
                            {/* Primary Download Button */}
                            <Button
                                onClick={handleDownload}
                                disabled={processing || !(certInfo && certInfo.issued && certInfo.trainings_completed)}
                                className={`w-full py-6 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#00C2CB]/20 transition-all ${
                                    processing || !(certInfo?.issued) 
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                    : 'bg-[#00ACC1] hover:bg-[#0097A7] text-white hover:-translate-y-0.5'
                                }`}
                            >
                                <Download size={18} /> {processing ? 'Preparing...' : 'Download PDF'}
                            </Button>

                            {/* Eligibility Status */}
                            {!certInfo || !certInfo.trainings_completed ? (
                                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-800">
                                    Certificate is issued after training. <a href="/member/events" className="font-bold underline">View events</a>
                                </div>
                            ) : null}

                            <div className="grid grid-cols-2 gap-2">
                                <Button 
                                    onClick={refreshCertificate} 
                                    variant="outline" 
                                    className="h-auto py-3 rounded-xl font-bold text-[#00838F] border-[#E0F7FA] hover:bg-[#F0FDFF]"
                                >
                                    Check Status
                                </Button>
                                <Button 
                                    onClick={() => setShowReissueDialog(true)} 
                                    variant="ghost" 
                                    className="h-auto py-3 rounded-xl font-bold text-[#00838F] hover:bg-[#F0FDFF]"
                                >
                                    Re-issue
                                </Button>
                            </div>

                            <Button 
                                onClick={handleShare} 
                                variant="outline" 
                                className="w-full py-3 rounded-xl font-bold text-[#0B1E3B] border-[#E0F7FA] hover:bg-gray-50"
                            >
                                <Share2 size={16} className="mr-2" /> Share Link
                            </Button>
                        </div>
                    </div>

                    {/* Verified Status Card (Mint Theme) */}
                    <div className="bg-[#E0F7FA] p-6 rounded-[2rem] border border-[#B2EBF2] relative overflow-hidden">
                        {/* Decorative Blob */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 rounded-full blur-2xl" />
                        
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className="p-2 bg-white rounded-full text-[#00ACC1] shadow-sm">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#0B1E3B] text-sm">Verified Status</h3>
                                <p className="text-[10px] text-[#00838F] font-bold">Active Member</p>
                            </div>
                        </div>
                        
                        <div className="space-y-3 relative z-10">
                            <div className="flex justify-between text-xs">
                                <span className="text-[#00838F]">Issued</span>
                                <span className={`font-bold ${certInfo?.issued ? 'text-[#00ACC1]' : 'text-amber-500'}`}>
                                    {certInfo?.issued ? 'Yes' : 'Pending'}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-[#00838F]">Date</span>
                                <span className="font-bold text-[#0B1E3B]">
                                    {certInfo?.issued_at ? new Date(certInfo.issued_at).toLocaleDateString() : '—'}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- DIALOGS (Styled) --- */}
            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <DialogContent className="bg-white rounded-2xl border border-[#E0F7FA]">
                    <DialogHeader>
                        <DialogTitle className="text-[#0B1E3B]">Cancel Certificate</DialogTitle>
                        <DialogDescription className="text-[#00838F]">
                            Are you sure you want to cancel (revoke) your certificate? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setShowCancelDialog(false)} className="text-[#0B1E3B]">Close</Button>
                        <Button onClick={handleCancelCertificate} className="bg-red-500 hover:bg-red-600 text-white rounded-full">Yes, Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showReissueDialog} onOpenChange={setShowReissueDialog}>
                <DialogContent className="bg-white rounded-2xl border border-[#E0F7FA]">
                    <DialogHeader>
                        <DialogTitle className="text-[#0B1E3B]">Request Re-issue</DialogTitle>
                        <DialogDescription className="text-[#00838F]">
                            Requesting a re-issue will create a new certificate if you meet eligibility.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setShowReissueDialog(false)} className="text-[#0B1E3B]">Cancel</Button>
                        <Button onClick={handleRequestReissue} className="bg-[#00ACC1] hover:bg-[#0097A7] text-white rounded-full">Proceed</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Toast Notification */}
            {toast && (
                <div className="fixed bottom-8 right-8 z-50 bg-[#0B1E3B] text-white px-6 py-3 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 flex items-center gap-2">
                    <Shield size={16} className="text-[#00ACC1]" />
                    <span className="text-sm font-bold">{toast}</span>
                </div>
            )}
        </div>
    );
};

export default Certificate;