/**
 * HENDERSON OVERRIDE PROTOCOL - KILL SWITCH DASHBOARD
 * Emergency system control for Roy Henderson
 * 
 * @version 1.0.0
 * @date November 22, 2025 - 10:50 EST
 * @author Henderson Standard - Fortune 50 Quality
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  AlertTriangle, 
  Power, 
  Lock, 
  Unlock, 
  Activity,
  Clock,
  User,
  FileText
} from 'lucide-react';

interface KillSwitchStatus {
  active: boolean;
  activatedAt?: string;
  activatedBy?: string;
  reason?: string;
  affectedSystems: string[];
  lastChecked: string;
}

interface SystemLog {
  id: string;
  timestamp: string;
  action: 'ACTIVATED' | 'DEACTIVATED' | 'VERIFIED';
  user: string;
  reason?: string;
  details?: string;
}

export default function KillSwitchDashboard() {
  const [status, setStatus] = useState<KillSwitchStatus | null>(null);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState(false);
  const [deactivating, setDeactivating] = useState(false);
  const [reason, setReason] = useState('');

  // Fetch current status
  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/admin/kill-switch/status');
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      }
    } catch (error) {
      console.error('Failed to fetch kill switch status:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch activity logs
  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/admin/kill-switch/logs');
      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs || []);
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    }
  };

  // Activate kill switch
  const activateKillSwitch = async () => {
    if (!reason.trim()) {
      alert('Please provide a reason for activation');
      return;
    }

    if (!confirm('⚠️ HENDERSON OVERRIDE PROTOCOL\n\nThis will IMMEDIATELY freeze ALL Javari operations system-wide.\n\nOnly Roy Henderson can reactivate.\n\nAre you absolutely certain?')) {
      return;
    }

    setActivating(true);
    try {
      const response = await fetch('/api/admin/kill-switch/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: reason.trim() })
      });

      if (response.ok) {
        await fetchStatus();
        await fetchLogs();
        setReason('');
        alert('✅ Kill switch activated successfully. All systems frozen.');
      } else {
        const error = await response.json();
        alert(`❌ Activation failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Activation error:', error);
      alert('❌ Failed to activate kill switch');
    } finally {
      setActivating(false);
    }
  };

  // Deactivate kill switch
  const deactivateKillSwitch = async () => {
    if (!confirm('Resume normal operations?\n\nThis will allow all Javari systems to function normally.')) {
      return;
    }

    setDeactivating(true);
    try {
      const response = await fetch('/api/admin/kill-switch/deactivate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'Manual deactivation by Roy' })
      });

      if (response.ok) {
        await fetchStatus();
        await fetchLogs();
        alert('✅ Kill switch deactivated. Systems resuming normal operations.');
      } else {
        const error = await response.json();
        alert(`❌ Deactivation failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Deactivation error:', error);
      alert('❌ Failed to deactivate kill switch');
    } finally {
      setDeactivating(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    fetchLogs();

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Activity className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Shield className="w-10 h-10 text-red-500" />
              Henderson Override Protocol
            </h1>
            <p className="text-slate-400">Emergency System Control • Roy Henderson Only</p>
          </div>
          <Badge variant={status?.active ? 'destructive' : 'default'} className="text-lg px-4 py-2">
            {status?.active ? (
              <><Lock className="w-4 h-4 mr-2" /> SYSTEM LOCKED</>
            ) : (
              <><Unlock className="w-4 h-4 mr-2" /> OPERATIONAL</>
            )}
          </Badge>
        </div>

        {/* Status Alert */}
        {status?.active && (
          <Alert variant="destructive" className="border-2 border-red-500">
            <AlertTriangle className="h-5 w-5" />
            <AlertDescription className="text-lg">
              <strong>⚠️ KILL SWITCH ACTIVE</strong>
              <div className="mt-2 text-sm space-y-1">
                <p>Activated: {status.activatedAt && new Date(status.activatedAt).toLocaleString()}</p>
                <p>By: {status.activatedBy}</p>
                <p>Reason: {status.reason}</p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Main Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* System Status Card */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5" />
                System Status
              </CardTitle>
              <CardDescription>Current state of all protected systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <span className="text-slate-300">Kill Switch</span>
                <Badge variant={status?.active ? 'destructive' : 'outline'}>
                  {status?.active ? 'ACTIVE' : 'INACTIVE'}
                </Badge>
              </div>

              {status?.affectedSystems && status.affectedSystems.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-slate-400">Frozen Systems:</h4>
                  <div className="space-y-1">
                    {status.affectedSystems.map((system, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-300 p-2 bg-slate-700/20 rounded">
                        <Lock className="w-3 h-3 text-red-400" />
                        {system}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-slate-400 pt-4 border-t border-slate-700">
                <Clock className="w-3 h-3" />
                Last checked: {status?.lastChecked && new Date(status.lastChecked).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          {/* Control Panel */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Power className="w-5 h-5" />
                Emergency Controls
              </CardTitle>
              <CardDescription>Activate or deactivate system freeze</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {!status?.active ? (
                // Activation Controls
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                      Reason for Activation
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Enter detailed reason for emergency freeze..."
                      className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                      rows={4}
                    />
                  </div>

                  <Button
                    onClick={activateKillSwitch}
                    disabled={activating || !reason.trim()}
                    variant="destructive"
                    className="w-full bg-red-600 hover:bg-red-700 text-lg py-6"
                  >
                    {activating ? (
                      <><Activity className="w-5 h-5 mr-2 animate-spin" /> ACTIVATING...</>
                    ) : (
                      <><AlertTriangle className="w-5 h-5 mr-2" /> ACTIVATE KILL SWITCH</>
                    )}
                  </Button>

                  <p className="text-xs text-slate-400 text-center">
                    ⚠️ This will immediately freeze all Javari operations system-wide
                  </p>
                </div>
              ) : (
                // Deactivation Controls
                <div className="space-y-4">
                  <Alert className="bg-red-950/30 border-red-800">
                    <AlertDescription className="text-red-300">
                      All systems are currently frozen. Click below to resume normal operations.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={deactivateKillSwitch}
                    disabled={deactivating}
                    variant="outline"
                    className="w-full border-green-600 text-green-400 hover:bg-green-950 text-lg py-6"
                  >
                    {deactivating ? (
                      <><Activity className="w-5 h-5 mr-2 animate-spin" /> DEACTIVATING...</>
                    ) : (
                      <><Unlock className="w-5 h-5 mr-2" /> DEACTIVATE KILL SWITCH</>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity Log */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Activity Log
            </CardTitle>
            <CardDescription>Recent kill switch operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {logs.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No activity logged</p>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30"
                  >
                    <div className="flex-shrink-0">
                      {log.action === 'ACTIVATED' && <Lock className="w-5 h-5 text-red-400" />}
                      {log.action === 'DEACTIVATED' && <Unlock className="w-5 h-5 text-green-400" />}
                      {log.action === 'VERIFIED' && <Shield className="w-5 h-5 text-blue-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium">{log.action}</span>
                        <span className="text-xs text-slate-400">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300 mb-1">
                        <User className="w-3 h-3" />
                        {log.user}
                      </div>
                      {log.reason && (
                        <p className="text-sm text-slate-400 mt-2">{log.reason}</p>
                      )}
                      {log.details && (
                        <p className="text-xs text-slate-500 mt-1">{log.details}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 border-t border-slate-700 pt-6">
          <p>Henderson Override Protocol v1.0.0</p>
          <p>Emergency System Control • Authorized Personnel Only</p>
          <p className="mt-2">© 2025 CR AudioViz AI, LLC • Built to Henderson Standard</p>
        </div>

      </div>
    </div>
  );
}
