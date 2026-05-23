import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  LayoutDashboard, Users, UserPlus, Banknote, FileSpreadsheet, Settings as Cog,
  Plus, Search, X, Edit2, Trash2, GraduationCap, Phone, Calendar, ChevronRight,
  AlertCircle, TrendingUp, Wallet, BookOpen, ArrowLeft, Check, CircleDollarSign,
  FileDown, Hash, CheckCircle2, Clock, Info, Camera, Upload, ArrowUpRight,
  Award, User, Lock, LogOut, ShieldCheck, Eye, EyeOff, KeyRound, ArrowRightCircle
} from 'lucide-react';

const CLASSES = ['Play','Nursery','KG','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const M_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const PT_MONTHLY = 'Monthly Tuition';
const PT_SESSION = 'Session Fee';
const PT_T1 = 'First Term Exam';
const PT_T2 = 'Second Term Exam';
const PT_TF = 'Final Term Exam';
const PT_OTHER = 'Other';
const PAYMENT_TYPES = [PT_MONTHLY, PT_SESSION, PT_T1, PT_T2, PT_TF, PT_OTHER];
const TERM_TYPES = [PT_T1, PT_T2, PT_TF];
const SCHOOL_DEFAULT = 'National School And College';
const CURRENCY_DEFAULT = 'TK';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Geist:wght@400..700&family=JetBrains+Mono:wght@500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body,.app{font-family:'Geist',system-ui,sans-serif;background:#F2F5EF;color:#0B1A12;min-height:100vh;-webkit-font-smoothing:antialiased}
.serif{font-family:'Fraunces',Georgia,serif;letter-spacing:-.015em}
.mono{font-family:'JetBrains Mono',monospace;font-feature-settings:'tnum'}
.app{display:flex;flex-direction:column;min-height:100vh}

.hdr{background:#FFFFFF;border-bottom:1px solid #D4DDD0;padding:16px 28px;display:flex;align-items:center;justify-content:space-between;gap:16px;position:sticky;top:0;z-index:50}
.brand{display:flex;align-items:center;gap:12px;min-width:0}
.bmark{width:40px;height:40px;flex-shrink:0;background:#1B4332;color:#FAFBF7;display:grid;place-items:center;border-radius:6px;font-family:'Fraunces',serif;font-weight:500;font-size:19px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),0 1px 2px rgba(11,26,18,.1)}
.btxt{display:flex;flex-direction:column;min-width:0}
.btit{font-family:'Fraunces',serif;font-weight:500;font-size:19px;line-height:1.1;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#0B1A12}
.bsub{font-size:11px;color:#5C6B5F;letter-spacing:.14em;text-transform:uppercase;margin-top:3px;font-weight:500}
.nav{display:flex;gap:2px;align-items:center}
.nb{padding:9px 13px;font-size:13px;font-weight:500;background:transparent;border:none;color:#5C6B5F;cursor:pointer;border-radius:6px;display:flex;align-items:center;gap:7px;transition:all .15s;font-family:inherit}
.nb:hover{background:#E6ECE1;color:#0B1A12}
.nb.on{background:#1B4332;color:#FAFBF7}
.hdr .logout{background:transparent;border:1px solid #D4DDD0;color:#5C6B5F;cursor:pointer;padding:8px 10px;border-radius:6px;margin-left:6px;display:flex;align-items:center;gap:6px;font-size:12.5px;font-family:inherit;font-weight:500}
.hdr .logout:hover{border-color:#1B4332;color:#1B4332;background:#FAFBF7}

.main{padding:32px 28px 100px;max-width:1200px;margin:0 auto;width:100%;flex:1}
.ph{margin-bottom:28px;display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap}
.pt{font-family:'Fraunces',serif;font-size:34px;font-weight:400;letter-spacing:-.025em;line-height:1;color:#0B1A12}
.ps{font-size:14px;color:#5C6B5F;margin-top:8px}
.ph .acts{display:flex;gap:8px;flex-wrap:wrap}

.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-bottom:32px}
.stat{background:#FFFFFF;border:1px solid #E6ECE1;padding:22px 22px 24px;border-radius:8px}
.sl{font-size:11.5px;color:#5C6B5F;letter-spacing:.1em;text-transform:uppercase;font-weight:500;margin-bottom:14px;display:flex;align-items:center;gap:8px}
.sv{font-family:'Fraunces',serif;font-size:32px;font-weight:400;letter-spacing:-.025em;line-height:1;color:#0B1A12}
.sv .cur{font-size:18px;color:#5C6B5F;margin-right:4px;font-family:'Geist',sans-serif;font-weight:500;letter-spacing:.02em}
.sf{margin-top:10px;font-size:12px;color:#5C6B5F}

.sec{font-family:'Fraunces',serif;font-size:22px;font-weight:500;letter-spacing:-.015em;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;gap:12px;color:#0B1A12}
.sec .c{font-family:'Geist',sans-serif;font-size:11.5px;color:#5C6B5F;letter-spacing:.1em;text-transform:uppercase;font-weight:500}

.ctabs{display:flex;gap:6px;overflow-x:auto;padding:4px 0 14px;margin-bottom:6px}
.ctabs::-webkit-scrollbar{height:4px}
.ctabs::-webkit-scrollbar-thumb{background:#D4DDD0;border-radius:4px}
.ct{padding:9px 16px;font-size:13px;font-weight:500;background:#FFFFFF;border:1px solid #E6ECE1;color:#1F3024;border-radius:7px;cursor:pointer;transition:all .15s;display:inline-flex;align-items:center;gap:8px;white-space:nowrap;font-family:inherit}
.ct:hover{border-color:#1B4332}
.ct.on{background:#1B4332;color:#FAFBF7;border-color:#1B4332}
.ct .b{font-size:11px;padding:1px 7px;background:#E6ECE1;color:#5C6B5F;border-radius:10px;font-family:'JetBrains Mono',monospace;font-weight:500}
.ct.on .b{background:rgba(255,255,255,.18);color:#FAFBF7}
.ct.all .b{background:#D8E5D5;color:#1B4332}
.ct.all.on .b{background:rgba(255,255,255,.2);color:#FAFBF7}

.tb{display:flex;gap:10px;align-items:center;margin-bottom:18px;flex-wrap:wrap}
.sr{flex:1;min-width:200px;position:relative;display:flex;align-items:center}
.sr input{width:100%;padding:11px 14px 11px 38px;background:#FFFFFF;border:1px solid #D4DDD0;border-radius:7px;font-size:14px;font-family:inherit;color:#0B1A12}
.sr input:focus{outline:none;border-color:#1B4332;background:#FFFFFF;box-shadow:0 0 0 3px #E8F0E5}
.sr svg{position:absolute;left:13px;color:#5C6B5F;pointer-events:none}

.btn{padding:10px 15px;font-size:13.5px;font-weight:500;font-family:inherit;border-radius:7px;border:1px solid transparent;cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:all .15s;white-space:nowrap}
.btn:disabled{opacity:.4;cursor:not-allowed}
.bp{background:#1B4332;color:#FAFBF7;border-color:#1B4332}
.bp:hover:not(:disabled){background:#0F2E20}
.bg{background:transparent;color:#1F3024;border-color:#D4DDD0}
.bg:hover{background:#E6ECE1}
.bd{background:transparent;color:#8B2E2E;border-color:#D4DDD0}
.bd:hover{background:#F0D9D9;border-color:#8B2E2E}
.bl{background:#386641;color:#FAFBF7;border-color:#386641}
.bl:hover{background:#1B4332;border-color:#1B4332}
.bw{background:#8B2E2E;color:#fff;border-color:#8B2E2E}
.bw:hover{background:#6B1F1F;border-color:#6B1F1F}
.bo{background:#5C6B5F;color:#fff;border-color:#5C6B5F}
.bo:hover{background:#3D4A41;border-color:#3D4A41}
.sm{padding:7px 11px;font-size:12.5px}
.lg{padding:13px 20px;font-size:14.5px}

.list{background:#FFFFFF;border:1px solid #E6ECE1;border-radius:8px;overflow:hidden}
.lr{display:grid;grid-template-columns:56px minmax(0,2.2fr) minmax(0,1.2fr) minmax(0,1fr) 32px;gap:14px;padding:14px 18px;align-items:center;border-bottom:1px solid #F0F4ED;cursor:pointer;transition:background .12s}
.lr:last-child{border-bottom:none}
.lr:hover{background:#FAFBF7}
.lr.h{background:#FAFBF7;cursor:default;padding:11px 18px}
.lr.h:hover{background:#FAFBF7}
.lh{font-size:11px;color:#5C6B5F;letter-spacing:.1em;text-transform:uppercase;font-weight:500}
.rn{font-family:'JetBrains Mono',monospace;font-size:13px;color:#1F3024;font-weight:500;background:#E6ECE1;padding:4px 8px;border-radius:5px;text-align:center;display:inline-block;min-width:36px}

.cn{display:flex;align-items:center;gap:12px;min-width:0}
.av{width:38px;height:38px;flex-shrink:0;border-radius:50%;background:#D8E5D5;color:#1B4332;display:grid;place-items:center;font-family:'Fraunces',serif;font-size:14px;font-weight:500;overflow:hidden}
.av img{width:100%;height:100%;object-fit:cover}
.av.g{background:#E8F0E5;color:#2D5F3F}
.av.o{background:#EBEEDA;color:#5C6B2F}
.av.r{background:#DDE5D9;color:#1F3024}
.av.b{background:#D2DECC;color:#386641}
.cnt{min-width:0}
.cnt .n{font-weight:500;font-size:14px;color:#0B1A12;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cnt .m{font-size:12px;color:#5C6B5F;margin-top:2px}
.cc{font-size:13px;color:#1F3024;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cb{font-family:'JetBrains Mono',monospace;font-size:13.5px;font-weight:500;color:#5C6B5F}
.cb.p{color:#386641}
.cb.d{color:#8B2E2E}
.chev{color:#8B9A8E;justify-self:end}

.em{background:#FFFFFF;border:1px dashed #D4DDD0;border-radius:8px;padding:56px 24px;text-align:center}
.ei{width:56px;height:56px;margin:0 auto 16px;background:#D8E5D5;color:#1B4332;border-radius:50%;display:grid;place-items:center}
.et{font-family:'Fraunces',serif;font-size:22px;font-weight:500;margin-bottom:6px;letter-spacing:-.015em;color:#0B1A12}
.es{font-size:14px;color:#5C6B5F;margin-bottom:20px;max-width:360px;margin-left:auto;margin-right:auto;line-height:1.5}

.card{background:#FFFFFF;border:1px solid #E6ECE1;border-radius:8px;padding:22px}
.ctit{font-family:'Fraunces',serif;font-size:17px;font-weight:500;margin-bottom:16px;letter-spacing:-.01em;display:flex;align-items:center;gap:8px;color:#0B1A12}
.fs{background:#FFFFFF;border:1px solid #E6ECE1;border-radius:8px;padding:24px 26px}
.fs+.fs{margin-top:14px}
.fst{font-family:'Fraunces',serif;font-size:17px;font-weight:500;letter-spacing:-.01em;margin-bottom:4px;display:flex;align-items:center;gap:8px;color:#0B1A12}
.fss{font-size:12.5px;color:#5C6B5F;margin-bottom:20px}
.fd{margin-bottom:14px}
.fd:last-child{margin-bottom:0}
.fd label{display:block;font-size:11.5px;font-weight:500;color:#1F3024;margin-bottom:6px;letter-spacing:.04em;text-transform:uppercase}
.fd label .rq{color:#8B2E2E;margin-left:3px}
.fd input,.fd select,.fd textarea{width:100%;padding:11px 13px;font-size:14px;font-family:inherit;background:#FAFBF7;border:1px solid #D4DDD0;border-radius:6px;color:#0B1A12}
.fd input:focus,.fd select:focus,.fd textarea:focus{outline:none;border-color:#1B4332;box-shadow:0 0 0 3px #E8F0E5}
.fd textarea{resize:vertical;min-height:70px}
.fd .hi{font-size:11.5px;color:#5C6B5F;margin-top:5px}
.fd .wn{font-size:12px;color:#1B4332;margin-top:5px;display:flex;align-items:center;gap:4px}
.fr2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.fr3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}

.phup{display:flex;align-items:center;gap:18px;padding:18px;background:#FAFBF7;border:1px dashed #D4DDD0;border-radius:8px;margin-bottom:18px}
.phpre{width:84px;height:84px;border-radius:50%;background:#D8E5D5;color:#1B4332;display:grid;place-items:center;font-family:'Fraunces',serif;font-size:30px;font-weight:500;flex-shrink:0;overflow:hidden;cursor:pointer;border:2px solid #FFFFFF;box-shadow:0 0 0 1px #D4DDD0}
.phpre:hover{box-shadow:0 0 0 2px #1B4332}
.phpre img{width:100%;height:100%;object-fit:cover}
.phinfo{flex:1;min-width:0}
.phinfo .h{font-family:'Fraunces',serif;font-size:15px;font-weight:500;margin-bottom:4px;color:#0B1A12}
.phinfo .s{font-size:12px;color:#5C6B5F;line-height:1.5}
.phacts{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}

.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1B4332;color:#FAFBF7;padding:12px 18px;border-radius:8px;font-size:14px;font-weight:500;z-index:200;display:flex;align-items:center;gap:8px;box-shadow:0 12px 32px -8px rgba(11,26,18,.3);animation:up .25s ease;max-width:90vw}
.toast.err{background:#8B2E2E}
@keyframes up{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}

.mov{position:fixed;inset:0;background:rgba(11,26,18,.4);display:grid;place-items:center;z-index:100;padding:16px;backdrop-filter:blur(2px)}
.modal{background:#FFFFFF;border-radius:10px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 48px -12px rgba(11,26,18,.25)}
.mh{padding:20px 24px;border-bottom:1px solid #E6ECE1;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:#FFFFFF;z-index:2}
.mt{font-family:'Fraunces',serif;font-size:22px;font-weight:500;letter-spacing:-.015em;color:#0B1A12}
.mc{background:transparent;border:none;cursor:pointer;padding:6px;color:#5C6B5F;border-radius:6px}
.mc:hover{background:#E6ECE1;color:#0B1A12}
.mb{padding:22px 24px}
.mf{padding:16px 24px;border-top:1px solid #E6ECE1;display:flex;gap:10px;justify-content:flex-end;position:sticky;bottom:0;background:#FFFFFF}

.dh{background:#FFFFFF;border:1px solid #E6ECE1;border-radius:8px;padding:24px 26px;margin-bottom:18px;display:flex;gap:22px;align-items:center;flex-wrap:wrap}
.da{width:84px;height:84px;border-radius:50%;display:grid;place-items:center;font-family:'Fraunces',serif;font-size:30px;font-weight:500;flex-shrink:0;overflow:hidden;background:#D8E5D5;color:#1B4332}
.da img{width:100%;height:100%;object-fit:cover}
.da.g{background:#E8F0E5;color:#2D5F3F}
.da.o{background:#EBEEDA;color:#5C6B2F}
.da.r{background:#DDE5D9;color:#1F3024}
.da.b{background:#D2DECC;color:#386641}
.di{flex:1;min-width:200px}
.dn{font-family:'Fraunces',serif;font-size:28px;font-weight:500;letter-spacing:-.02em;line-height:1.1;color:#0B1A12}
.dt{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
.tg{font-size:12px;padding:4px 10px;background:#E6ECE1;color:#1F3024;border-radius:20px;font-weight:500;display:inline-flex;align-items:center;gap:5px}
.tg.r{background:#D8E5D5;color:#1B4332}
.dax{display:flex;gap:8px}

.pn{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
.ir{display:flex;padding:9px 0;border-bottom:1px dashed #E6ECE1}
.ir:last-child{border-bottom:none}
.ir .l{font-size:12px;color:#5C6B5F;flex:0 0 130px;padding-top:1px}
.ir .v{font-size:14px;color:#0B1A12;word-break:break-word;flex:1}

.sfg{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px}
.sfb{background:#FAFBF7;border:1px solid #E6ECE1;border-radius:7px;padding:14px 14px 16px}
.sfb.pd{background:#E8F0E5;border-color:rgba(56,102,65,.25)}
.sfb.pt{background:#EBEEDA;border-color:rgba(92,107,47,.25)}
.sfb .ttl{font-size:11px;color:#5C6B5F;letter-spacing:.06em;text-transform:uppercase;font-weight:500;display:flex;align-items:center;gap:5px}
.sfb.pd .ttl,.sfb.pt .ttl{color:#1F3024}
.sfb .amt{font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:500;margin-top:8px;color:#0B1A12}
.sfb .ext{font-size:11.5px;color:#5C6B5F;margin-top:3px}
.sfb.pd .ext{color:#386641}

.yr{display:flex;align-items:center;gap:12px;margin-bottom:14px;flex-wrap:wrap}
.yr select{padding:7px 12px;font-size:13px;font-family:inherit;background:#FAFBF7;border:1px solid #D4DDD0;border-radius:6px;color:#0B1A12;cursor:pointer}
.mg{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.mcell{background:#FAFBF7;border:1px solid #E6ECE1;border-radius:7px;padding:12px;position:relative}
.mcell.pd{background:#E8F0E5;border-color:rgba(56,102,65,.25)}
.mcell.pt{background:#EBEEDA;border-color:rgba(92,107,47,.25)}
.mcell .mn{font-size:12px;color:#5C6B5F;font-weight:500;letter-spacing:.04em}
.mcell.pd .mn,.mcell.pt .mn{color:#1F3024}
.mcell .ma{font-family:'JetBrains Mono',monospace;font-size:13.5px;font-weight:500;margin-top:5px;color:#0B1A12}
.mcell .ms{position:absolute;top:9px;right:9px}
.mcell.pd .ms{color:#386641}
.mcell.pt .ms{color:#5C6B2F}

.pl{background:#FAFBF7;border-radius:7px;border:1px solid #E6ECE1;overflow:hidden}
.pr{display:grid;grid-template-columns:minmax(0,1fr) auto auto auto;gap:14px;padding:12px 16px;border-bottom:1px solid #E6ECE1;align-items:center}
.pr:last-child{border-bottom:none}
.pr.h{background:#FFFFFF;padding:9px 16px}
.pi{min-width:0}
.p1{font-size:13px;color:#0B1A12;font-weight:500}
.p2{font-size:11.5px;color:#5C6B5F;margin-top:2px}
.pm{font-family:'JetBrains Mono',monospace;font-size:11.5px;background:#D8E5D5;color:#1B4332;padding:3px 8px;border-radius:4px;font-weight:500;white-space:nowrap}
.pm.t{background:#EBEEDA;color:#5C6B2F}
.pm.s{background:#1B4332;color:#FAFBF7}
.pa{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;color:#386641;white-space:nowrap}
.pd{background:transparent;border:none;cursor:pointer;padding:5px;color:#8B9A8E;border-radius:4px}
.pd:hover{color:#8B2E2E;background:#F0D9D9}

.bk{display:inline-flex;align-items:center;gap:6px;background:transparent;border:none;color:#5C6B5F;cursor:pointer;font-size:13px;font-family:inherit;padding:0;margin-bottom:16px}
.bk:hover{color:#0B1A12}

.eg{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.ec{background:#FFFFFF;border:1px solid #E6ECE1;border-radius:8px;padding:22px;display:flex;flex-direction:column}
.ec .top{display:flex;align-items:center;gap:11px;margin-bottom:12px}
.ec .ic{width:38px;height:38px;border-radius:7px;display:grid;place-items:center;background:#E8F0E5;color:#386641}
.ec.r .ic{background:#D8E5D5;color:#1B4332}
.ec.b .ic{background:#D2DECC;color:#2D5F3F}
.ec.o .ic{background:#EBEEDA;color:#5C6B2F}
.ec.p .ic{background:#DDE5D9;color:#1F3024}
.ec h3{font-family:'Fraunces',serif;font-size:18px;font-weight:500;letter-spacing:-.01em;color:#0B1A12}
.ec p{font-size:13px;color:#5C6B5F;line-height:1.5;margin-bottom:18px;flex:1}
.ins{background:#E8F0E5;border:1px solid rgba(27,67,50,.2);border-radius:8px;padding:18px 22px;margin-top:18px}
.ins h4{font-family:'Fraunces',serif;font-size:16px;font-weight:500;margin-bottom:8px;color:#1B4332;display:flex;align-items:center;gap:6px}
.ins ol{padding-left:20px;color:#1F3024}
.ins li{font-size:13px;line-height:1.7}

.dz{background:#F0D9D9;border:1px solid rgba(139,46,46,.2);border-radius:8px;padding:20px 22px;margin-top:18px}
.dz h3{font-family:'Fraunces',serif;font-size:16px;font-weight:500;color:#8B2E2E;margin-bottom:6px}
.dz p{font-size:13px;color:#1F3024;margin-bottom:14px}

.cft{font-size:14.5px;color:#1F3024;line-height:1.55}
.cft strong{color:#0B1A12;font-weight:600}

/* promote modal */
.prom-arrow{display:flex;align-items:center;justify-content:center;color:#1B4332;margin:8px 0}
.prom-summary{background:#E8F0E5;border:1px solid rgba(27,67,50,.2);border-radius:7px;padding:12px 14px;font-size:13px;color:#1B4332;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.prom-list{background:#FAFBF7;border:1px solid #E6ECE1;border-radius:7px;max-height:240px;overflow-y:auto;margin-top:8px}
.prom-row{padding:9px 14px;border-bottom:1px solid #F0F4ED;display:flex;align-items:center;gap:10px;cursor:pointer;font-size:13px}
.prom-row:last-child{border-bottom:none}
.prom-row:hover{background:#FFFFFF}
.prom-row input[type=checkbox]{width:16px;height:16px;accent-color:#1B4332;cursor:pointer}
.prom-row .rl{font-family:'JetBrains Mono',monospace;font-size:11.5px;background:#E6ECE1;color:#1F3024;padding:2px 6px;border-radius:4px;font-weight:500;min-width:30px;text-align:center}
.prom-row .nm{flex:1;color:#0B1A12;font-weight:500}
.prom-meta{display:flex;justify-content:space-between;font-size:11.5px;color:#5C6B5F;padding:8px 14px;background:#FFFFFF;border-bottom:1px solid #E6ECE1}
.prom-meta button{background:transparent;border:none;color:#1B4332;cursor:pointer;font-family:inherit;font-size:11.5px;font-weight:500;padding:0}
.prom-meta button:hover{text-decoration:underline}
.opt-row{display:flex;align-items:center;gap:10px;padding:11px 14px;background:#FAFBF7;border:1px solid #E6ECE1;border-radius:7px;margin-top:12px;cursor:pointer}
.opt-row input{width:16px;height:16px;accent-color:#1B4332;cursor:pointer}
.opt-row .opt-l{flex:1}
.opt-row .opt-t{font-size:13px;color:#0B1A12;font-weight:500}
.opt-row .opt-s{font-size:11.5px;color:#5C6B5F;margin-top:2px}

.ld{display:grid;place-items:center;min-height:60vh;color:#5C6B5F;font-size:13px}
.mnav{display:none}

.auth{min-height:100vh;background:linear-gradient(180deg,#FAFBF7 0%,#E8F0E5 100%);display:grid;place-items:center;padding:32px 20px;position:relative}
.auth::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#1B4332,transparent);opacity:.4}
.auth-inner{width:100%;max-width:400px;text-align:center;position:relative;z-index:1}
.auth-crest{width:80px;height:80px;margin:0 auto 26px;background:#1B4332;color:#FAFBF7;border-radius:10px;display:grid;place-items:center;font-family:'Fraunces',serif;font-weight:500;font-size:38px;letter-spacing:-.02em;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),0 12px 32px -8px rgba(27,67,50,.4),0 2px 4px rgba(11,26,18,.1);position:relative}
.auth-crest::after{content:'';position:absolute;inset:6px;border:1px solid rgba(255,255,255,.18);border-radius:6px;pointer-events:none}
.auth-school{font-family:'Fraunces',serif;font-size:28px;font-weight:400;letter-spacing:-.025em;color:#0B1A12;line-height:1.15;margin-bottom:8px}
.auth-tag{font-size:11px;color:#5C6B5F;letter-spacing:.18em;text-transform:uppercase;margin-bottom:36px;font-weight:500}
.auth-tag::before,.auth-tag::after{content:'·';margin:0 8px;opacity:.5}
.auth-greet{font-family:'Fraunces',serif;font-size:18px;font-weight:500;color:#1F3024;margin-bottom:6px;letter-spacing:-.01em}
.auth-prompt{font-size:13.5px;color:#5C6B5F;margin-bottom:24px;line-height:1.55}
.auth-form{text-align:left}
.auth-field{margin-bottom:12px;position:relative}
.auth-field input{width:100%;padding:14px 44px 14px 16px;font-size:15px;font-family:inherit;background:#FFFFFF;border:1px solid #D4DDD0;border-radius:8px;color:#0B1A12;transition:all .15s}
.auth-field input:focus{outline:none;border-color:#1B4332;box-shadow:0 0 0 3px #E8F0E5}
.auth-eye{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:transparent;border:none;cursor:pointer;color:#5C6B5F;padding:6px;border-radius:5px;display:grid;place-items:center}
.auth-eye:hover{color:#1B4332;background:#E8F0E5}
.auth-btn{width:100%;padding:14px;font-size:14px;font-weight:500;font-family:inherit;background:#1B4332;color:#FAFBF7;border:none;border-radius:8px;cursor:pointer;letter-spacing:.02em;transition:all .15s;margin-top:6px;display:inline-flex;align-items:center;justify-content:center;gap:8px}
.auth-btn:hover:not(:disabled){background:#0F2E20}
.auth-btn:disabled{opacity:.5;cursor:not-allowed}
.auth-error{background:#F0D9D9;color:#8B2E2E;padding:10px 14px;border-radius:7px;font-size:13px;margin-bottom:14px;display:flex;align-items:center;gap:8px}
.auth-info{background:#E8F0E5;color:#1B4332;padding:10px 14px;border-radius:7px;font-size:12.5px;margin-bottom:14px;display:flex;align-items:flex-start;gap:8px;line-height:1.5}
.auth-foot{margin-top:32px;font-size:11.5px;color:#8B9A8E;text-align:center;line-height:1.7}
.auth-foot strong{color:#5C6B5F;font-weight:500}

@media (max-width:800px){
  .hdr{padding:14px 16px}.hdr .nav{display:none}.main{padding:22px 16px 100px}.pt{font-size:26px}
  .stats{grid-template-columns:1fr;gap:10px;margin-bottom:24px}.stat{padding:18px}.sv{font-size:26px}
  .lr{grid-template-columns:44px 1fr auto;gap:10px;padding:13px 14px}.lr.h{display:none}.cc{display:none}.chev{display:none}
  .fr2,.fr3{grid-template-columns:1fr}.pn{grid-template-columns:1fr}.mg{grid-template-columns:repeat(3,1fr)}.sfg{grid-template-columns:repeat(2,1fr)}
  .dh{padding:18px;gap:14px}.da{width:64px;height:64px;font-size:22px}.dn{font-size:22px}
  .mf{flex-direction:column-reverse}.mf .btn{width:100%;justify-content:center}.eg{grid-template-columns:1fr}
  .pr{grid-template-columns:1fr auto auto;gap:10px;padding:11px 13px}.pr .pm{display:none}.pr.h{display:none}
  .ph .acts{width:100%}.ph .acts .btn{flex:1;justify-content:center;min-width:0;padding:10px 8px;font-size:12.5px}
  .hdr .logout{padding:7px 8px}.hdr .logout span{display:none}
  .mnav{display:grid;grid-template-columns:repeat(6,1fr);position:fixed;bottom:0;left:0;right:0;z-index:60;background:#FFFFFF;border-top:1px solid #D4DDD0;padding:8px 4px 12px}
  .mnav button{background:transparent;border:none;padding:8px 4px;display:flex;flex-direction:column;align-items:center;gap:3px;color:#5C6B5F;font-family:inherit;cursor:pointer;font-size:10px;font-weight:500;border-radius:6px}
  .mnav button.on{color:#0B1A12}.mnav button.on svg{color:#1B4332}
  .phup{flex-direction:column;text-align:center;gap:12px}.phacts{justify-content:center}
  .auth-school{font-size:24px}.auth-crest{width:72px;height:72px;font-size:32px}
}
@media (max-width:420px){.mg{grid-template-columns:repeat(2,1fr)}.ir .l{flex:0 0 100px;font-size:11.5px}}
`;

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const ini = (n) => { if (!n) return '?'; const p = n.trim().split(/\s+/); return (p[0][0] + (p[1]?.[0] || '')).toUpperCase(); };
const AC = ['', 'g', 'o', 'r', 'b'];
const ac = (id) => AC[(parseInt((id || '').slice(-2), 36) || 0) % AC.length];
const fmt = (n, c) => `${c} ${(Number(n) || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
const today = () => new Date().toISOString().slice(0, 10);

const csvEsc = (v) => { if (v == null) return ''; const s = String(v); return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
const toCSV = (h, r) => [h.map(csvEsc).join(','), ...r.map(x => x.map(csvEsc).join(','))].join('\n');
const dl = (content, filename) => {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const hashPw = async (pw) => {
  const enc = new TextEncoder().encode(pw + 'nsc-salt-v1');
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
};

// Image compression - tighter for storage efficiency
const compressImage = (file) => new Promise((resolve, reject) => {
  if (!file || !file.type.startsWith('image/')) { reject(new Error('Not an image')); return; }
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const MAX = 220;
      let w = img.width, h = img.height;
      if (w > h) { if (w > MAX) { h = h * MAX / w; w = MAX; } }
      else { if (h > MAX) { w = w * MAX / h; h = MAX; } }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = e.target.result;
  };
  reader.onerror = () => reject(new Error('File read failed'));
  reader.readAsDataURL(file);
});

// Photo cache + concurrency-limited loader
// Each photo is stored in its own key: `sm-photo-{studentId}` (allows scaling to 500+ students)
const photoCache = new Map(); // id -> dataUrl | null (null means tried and no photo)
const photoInFlight = new Map(); // id -> Promise
let photoActive = 0;
const PHOTO_CONCURRENCY = 6;
const photoQueue = [];

const runNextPhoto = () => {
  while (photoActive < PHOTO_CONCURRENCY && photoQueue.length) {
    const fn = photoQueue.shift();
    photoActive++;
    fn().finally(() => { photoActive--; runNextPhoto(); });
  }
};

const loadPhoto = (id) => {
  if (!id) return Promise.resolve(null);
  if (photoCache.has(id)) return Promise.resolve(photoCache.get(id));
  if (photoInFlight.has(id)) return photoInFlight.get(id);
  const p = new Promise((resolve) => {
    photoQueue.push(async () => {
      try {
        const r = await window.storage.get(`sm-photo-${id}`);
        const val = r?.value || null;
        photoCache.set(id, val);
        resolve(val);
      } catch {
        photoCache.set(id, null);
        resolve(null);
      } finally {
        photoInFlight.delete(id);
      }
    });
    runNextPhoto();
  });
  photoInFlight.set(id, p);
  return p;
};

const savePhoto = async (id, dataUrl) => {
  if (!dataUrl) {
    try { await window.storage.delete(`sm-photo-${id}`); } catch {}
    photoCache.set(id, null);
    return false;
  }
  try {
    await window.storage.set(`sm-photo-${id}`, dataUrl);
    photoCache.set(id, dataUrl);
    return true;
  } catch (e) {
    return null;
  }
};

const deletePhoto = async (id) => {
  try { await window.storage.delete(`sm-photo-${id}`); } catch {}
  photoCache.delete(id);
};

const SH = ['Roll No', 'Full Name', 'Class', 'Gender', 'Date of Birth', 'Enrollment Date', "Father's Name", "Father's Phone", "Mother's Name", "Mother's Phone", 'Address', 'Monthly Fee', 'Session Fee', 'Notes'];
const PH_HDR = ['Payment Date', 'Class', 'Roll No', 'Student Name', 'Payment Type', 'Month/Period', 'Year', 'Amount', 'Method', 'Description'];
const srow = (s) => [s.rollNumber || '', s.fullName || '', s.studentClass || '', s.gender || '', s.dob || '', s.enrollmentDate || '', s.parentName || '', s.parentPhone || '', s.motherName || '', s.motherPhone || '', s.address || '', s.monthlyFee || 0, s.sessionFee || 0, s.notes || ''];
const prow = (p, s) => [p.paidDate || '', s?.studentClass || '', s?.rollNumber || '', s?.fullName || '', p.paymentType || PT_MONTHLY, p.month || '', p.year || '', p.amount || 0, p.method || '', p.description || ''];

// Self-contained avatar: loads photo from cache/storage when needed
const Avatar = ({ student, size = 'sm' }) => {
  const cls = size === 'lg' ? 'da' : 'av';
  const colorCls = ac(student?.id);
  const [loaded, setLoaded] = useState(() => student?.id ? photoCache.get(student.id) : null);

  useEffect(() => {
    if (!student?.id || !student?.hasPhoto) { setLoaded(null); return; }
    if (photoCache.has(student.id)) { setLoaded(photoCache.get(student.id)); return; }
    let cancelled = false;
    loadPhoto(student.id).then(v => { if (!cancelled) setLoaded(v); });
    return () => { cancelled = true; };
  }, [student?.id, student?.hasPhoto]);

  const photo = student?.photo || loaded;
  if (photo) return <div className={`${cls} ${colorCls}`}><img src={photo} alt={student.fullName} /></div>;
  return <div className={`${cls} ${colorCls}`}>{ini(student?.fullName || '?')}</div>;
};

const crestInitial = (name) => name?.trim()?.[0]?.toUpperCase() || 'N';

export default function App() {
  const [authState, setAuthState] = useState('loading');
  const [savedHash, setSavedHash] = useState(null);
  const [tempSchoolName, setTempSchoolName] = useState(SCHOOL_DEFAULT);

  const [page, setPage] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [settings, setSettings] = useState({ schoolName: SCHOOL_DEFAULT, currency: CURRENCY_DEFAULT, defaultMonthlyFee: 0, defaultSessionFee: 0, academicYear: new Date().getFullYear() + '' });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [selClass, setSelClass] = useState('All');
  const [selId, setSelId] = useState(null);
  const [pfClass, setPfClass] = useState('All');
  const [pfMonth, setPfMonth] = useState('All');
  const [pfType, setPfType] = useState('All');
  const [vYear, setVYear] = useState(new Date().getFullYear());
  const [editing, setEditing] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [confDel, setConfDel] = useState(null);
  const [confClear, setConfClear] = useState(false);
  const [showPromote, setShowPromote] = useState(false);

  // Initial: settings + auth
  useEffect(() => {
    (async () => {
      try {
        const cfg = await window.storage.get('sm-settings');
        if (cfg?.value) {
          const parsed = JSON.parse(cfg.value);
          let needsSave = false;
          if (parsed.schoolName === 'My School') { parsed.schoolName = SCHOOL_DEFAULT; needsSave = true; }
          if (parsed.currency === '$') { parsed.currency = CURRENCY_DEFAULT; needsSave = true; }
          if (needsSave) await window.storage.set('sm-settings', JSON.stringify(parsed));
          setSettings(p => ({ ...p, ...parsed }));
          setTempSchoolName(parsed.schoolName || SCHOOL_DEFAULT);
        }
      } catch (e) {}

      try {
        const auth = await window.storage.get('sm-auth');
        if (auth?.value) {
          const { hash } = JSON.parse(auth.value);
          setSavedHash(hash);
          setAuthState('login');
        } else {
          setAuthState('setup');
        }
      } catch (e) {
        setAuthState('setup');
      }
    })();
  }, []);

  // Data load: after auth
  useEffect(() => {
    if (authState !== 'authed') return;
    (async () => {
      let stsList = [];
      try { const r = await window.storage.get('sm-students'); if (r?.value) stsList = JSON.parse(r.value); } catch {}

      // Migrate inline photos to separate keys (one-time)
      let migrated = false;
      const updated = await Promise.all(stsList.map(async (s) => {
        if (s.photo && !s.hasPhoto) {
          const ok = await savePhoto(s.id, s.photo);
          if (ok) {
            const { photo, ...rest } = s;
            migrated = true;
            return { ...rest, hasPhoto: true };
          }
        }
        return s;
      }));
      setStudents(updated);
      if (migrated) { try { await window.storage.set('sm-students', JSON.stringify(updated)); } catch {} }

      try { const r = await window.storage.get('sm-payments'); if (r?.value) setPayments(JSON.parse(r.value)); } catch {}
      setLoading(false);
    })();
  }, [authState]);

  const saveStudentsRaw = async (n) => {
    setStudents(n);
    try { await window.storage.set('sm-students', JSON.stringify(n)); }
    catch (e) { tst('Save failed', 'err'); }
  };
  const savePy = async (n) => { setPayments(n); try { await window.storage.set('sm-payments', JSON.stringify(n)); } catch (e) {} };
  const saveCfg = async (n) => { setSettings(n); try { await window.storage.set('sm-settings', JSON.stringify(n)); } catch (e) {} };
  const tst = (m, type) => { setToast({ msg: m, type: type || 'ok' }); setTimeout(() => setToast(null), 2800); };

  const setupPassword = async (pw) => {
    const hash = await hashPw(pw);
    await window.storage.set('sm-auth', JSON.stringify({ hash, createdAt: new Date().toISOString() }));
    setSavedHash(hash);
    setAuthState('authed');
  };
  const tryLogin = async (pw) => {
    const hash = await hashPw(pw);
    if (hash === savedHash) { setAuthState('authed'); return true; }
    return false;
  };
  const signOut = () => { setAuthState('login'); setSelId(null); setPage('dashboard'); };
  const changePassword = async (current, newPw) => {
    const curHash = await hashPw(current);
    if (curHash !== savedHash) return { ok: false, msg: 'Current password is incorrect' };
    const newHash = await hashPw(newPw);
    await window.storage.set('sm-auth', JSON.stringify({ hash: newHash, createdAt: new Date().toISOString() }));
    setSavedHash(newHash);
    return { ok: true };
  };

  const byClass = useMemo(() => {
    const m = {}; CLASSES.forEach(c => m[c] = []);
    students.forEach(s => { if (m[s.studentClass]) m[s.studentClass].push(s); });
    Object.keys(m).forEach(c => m[c].sort((a, b) => (parseInt(a.rollNumber) || 999) - (parseInt(b.rollNumber) || 999)));
    return m;
  }, [students]);

  const byStudent = useMemo(() => {
    const m = {}; payments.forEach(p => { (m[p.studentId] = m[p.studentId] || []).push(p); });
    return m;
  }, [payments]);

  const stats = useMemo(() => {
    const tStud = students.length;
    const tColl = payments.reduce((a, p) => a + (+p.amount || 0), 0);
    const yr = new Date().getFullYear();
    const yColl = payments.filter(p => p.year == yr).reduce((a, p) => a + (+p.amount || 0), 0);
    const expM = students.reduce((a, s) => a + (+s.monthlyFee || 0), 0);
    const expY = expM * 12;
    const out = Math.max(0, expY - yColl);
    return { tStud, tColl, yColl, expM, expY, out };
  }, [students, payments]);

  const sel = selId ? students.find(s => s.id === selId) : null;

  const addStudent = async (data) => {
    const id = uid();
    let hasPhoto = false;
    if (data.photo) { hasPhoto = !!(await savePhoto(id, data.photo)); }
    const { photo, ...rest } = data;
    const newStudent = { id, ...rest, hasPhoto, createdAt: new Date().toISOString() };
    saveStudentsRaw([...students, newStudent]);
    tst(`${data.fullName} added to ${data.studentClass}`);
  };
  const updStudent = async (data) => {
    const id = editing.id;
    let hasPhoto = !!editing.hasPhoto;
    // If photo field present and changed, save; if cleared, delete
    if (data.photo) {
      hasPhoto = !!(await savePhoto(id, data.photo));
    } else if (editing.hasPhoto) {
      await savePhoto(id, ''); // delete
      hasPhoto = false;
    }
    const { photo, ...rest } = data;
    saveStudentsRaw(students.map(s => s.id === id ? { ...s, ...rest, hasPhoto } : s));
    setShowEdit(false); setEditing(null);
    tst('Student updated');
  };
  const delStudent = async (id) => {
    const s = students.find(x => x.id === id);
    await deletePhoto(id);
    saveStudentsRaw(students.filter(x => x.id !== id));
    savePy(payments.filter(p => p.studentId !== id));
    setConfDel(null);
    if (selId === id) setSelId(null);
    tst(`${s?.fullName || 'Student'} removed`);
  };
  const addPay = (d) => { savePy([...payments, { id: uid(), ...d, recordedAt: new Date().toISOString() }]); const s = students.find(x => x.id === d.studentId); tst(`Payment recorded for ${s?.fullName || 'student'}`); };
  const delPay = (id) => { savePy(payments.filter(p => p.id !== id)); tst('Payment removed'); };

  const promote = (ids, targetClass, renumber) => {
    let next = students.map(s => {
      if (!ids.includes(s.id)) return s;
      return { ...s, studentClass: targetClass };
    });
    if (renumber) {
      // Renumber the target class from 1 by current order (existing first by old roll, then promoted in original order)
      const inTarget = next.filter(s => s.studentClass === targetClass);
      // Stable sort: existing target students first by existing roll, promoted students follow
      const existing = inTarget.filter(s => !ids.includes(s.id)).sort((a, b) => (parseInt(a.rollNumber) || 999) - (parseInt(b.rollNumber) || 999));
      const promoted = inTarget.filter(s => ids.includes(s.id)).sort((a, b) => (parseInt(a.rollNumber) || 999) - (parseInt(b.rollNumber) || 999));
      const ordered = [...existing, ...promoted];
      const rollMap = {};
      ordered.forEach((s, i) => { rollMap[s.id] = i + 1; });
      next = next.map(s => rollMap[s.id] ? { ...s, rollNumber: rollMap[s.id].toString() } : s);
    }
    saveStudentsRaw(next);
    setShowPromote(false);
    tst(`Promoted ${ids.length} student${ids.length === 1 ? '' : 's'} to Class ${targetClass}`);
  };

  const fname = () => settings.schoolName.replace(/[^a-z0-9]/gi, '_');
  const expCWStudents = () => {
    let n = 0;
    CLASSES.forEach(c => { if (byClass[c].length) { dl(toCSV(SH, byClass[c].map(srow)), `${fname()}-Students-Class-${c}.csv`); n++; } });
    tst(n === 0 ? 'No students to export' : `${n} class file(s) downloaded`);
  };
  const expAllStudents = () => {
    if (!students.length) { tst('No students to export'); return; }
    const rows = []; CLASSES.forEach(c => byClass[c].forEach(s => rows.push(srow(s))));
    dl(toCSV(SH, rows), `${fname()}-All-Students.csv`);
    tst('All students exported');
  };
  const expOneClassStudents = (c) => {
    if (!byClass[c]?.length) { tst(`No students in Class ${c}`); return; }
    dl(toCSV(SH, byClass[c].map(srow)), `${fname()}-Students-Class-${c}.csv`);
    tst(`Class ${c} students exported`);
  };
  const expAllPayments = () => {
    if (!payments.length) { tst('No payments to export'); return; }
    const sorted = [...payments].sort((a, b) => (a.paidDate || '').localeCompare(b.paidDate || ''));
    dl(toCSV(PH_HDR, sorted.map(p => prow(p, students.find(s => s.id === p.studentId)))), `${fname()}-All-Payments.csv`);
    tst('Payments exported');
  };
  const expCWPayments = () => {
    let n = 0;
    CLASSES.forEach(c => {
      const ids = (byClass[c] || []).map(s => s.id);
      const cp = payments.filter(p => ids.includes(p.studentId)).sort((a, b) => (a.paidDate || '').localeCompare(b.paidDate || ''));
      if (cp.length) {
        const rows = cp.map(p => prow(p, students.find(s => s.id === p.studentId)));
        dl(toCSV(PH_HDR, rows), `${fname()}-Payments-Class-${c}.csv`); n++;
      }
    });
    tst(n === 0 ? 'No payments to export' : `${n} payment file(s) downloaded`);
  };
  const expOneClassPayments = (c) => {
    const ids = (byClass[c] || []).map(s => s.id);
    const cp = payments.filter(p => ids.includes(p.studentId)).sort((a, b) => (a.paidDate || '').localeCompare(b.paidDate || ''));
    if (!cp.length) { tst(`No payments for Class ${c}`); return; }
    dl(toCSV(PH_HDR, cp.map(p => prow(p, students.find(s => s.id === p.studentId)))), `${fname()}-Payments-Class-${c}.csv`);
    tst(`Class ${c} payments exported`);
  };

  if (authState === 'loading') {
    return <div className="app"><style>{CSS}</style><div className="auth"><div className="auth-inner"><div className="auth-crest">{crestInitial(tempSchoolName)}</div><div style={{color:'#5C6B5F',fontSize:13}}>Loading…</div></div></div></div>;
  }
  if (authState === 'setup') return <SetupScreen onSetup={setupPassword} schoolName={tempSchoolName} />;
  if (authState === 'login') return <LoginScreen onLogin={tryLogin} schoolName={tempSchoolName} />;

  if (loading) return <div className="app"><style>{CSS}</style><div className="ld">Loading…</div></div>;

  const tabs = [
    { id: 'dashboard', l: 'Dashboard', ic: LayoutDashboard },
    { id: 'students', l: 'Students', ic: Users },
    { id: 'add', l: 'Add Student', ic: UserPlus },
    { id: 'payments', l: 'Payments', ic: Banknote },
    { id: 'export', l: 'Export', ic: FileSpreadsheet },
    { id: 'settings', l: 'Settings', ic: Cog }
  ];
  const go = (p) => { setPage(p); setSelId(null); };

  return (
    <div className="app">
      <style>{CSS}</style>
      <header className="hdr">
        <div className="brand">
          <div className="bmark">{crestInitial(settings.schoolName)}</div>
          <div className="btxt">
            <div className="btit">{settings.schoolName}</div>
            <div className="bsub">Admin Portal · {settings.academicYear}</div>
          </div>
        </div>
        <nav className="nav">
          {tabs.map(t => (
            <button key={t.id} className={`nb ${page === t.id ? 'on' : ''}`} onClick={() => go(t.id)}>
              <t.ic size={14} /> {t.l}
            </button>
          ))}
          <button className="logout" onClick={signOut} title="Sign out"><LogOut size={13} /><span>Sign out</span></button>
        </nav>
      </header>

      <main className="main">
        {page === 'dashboard' && <Dashboard stats={stats} settings={settings} students={students} payments={payments} byClass={byClass} onGo={go} onOpen={(id) => { setSelId(id); setPage('students'); }} />}
        {page === 'students' && !sel && <StudentsList students={students} byClass={byClass} settings={settings} byStudent={byStudent} selClass={selClass} setSelClass={setSelClass} onOpen={setSelId} onAdd={() => setPage('add')} onDownloadAll={expAllStudents} onDownloadClass={expOneClassStudents} onDownloadAllCW={expCWStudents} onPromote={() => setShowPromote(true)} />}
        {page === 'students' && sel && <StudentDetail student={sel} settings={settings} payments={byStudent[sel.id] || []} vYear={vYear} setVYear={setVYear} onBack={() => setSelId(null)} onEdit={() => { setEditing(sel); setShowEdit(true); }} onDelete={() => setConfDel(sel.id)} onDelPay={delPay} onRecord={() => setPage('payments')} />}
        {page === 'add' && <AddStudent settings={settings} existing={students} onAdd={addStudent} onView={() => setPage('students')} onToast={tst} />}
        {page === 'payments' && <Payments students={students} payments={payments} settings={settings} byClass={byClass} fClass={pfClass} setFClass={setPfClass} fMonth={pfMonth} setFMonth={setPfMonth} fType={pfType} setFType={setPfType} onAdd={addPay} onDel={delPay} onOpen={(id) => { setSelId(id); setPage('students'); }} onDownloadAll={expAllPayments} onDownloadClass={expOneClassPayments} onDownloadAllCW={expCWPayments} />}
        {page === 'export' && <Export stats={stats} settings={settings} onCWStudents={expCWStudents} onAllStudents={expAllStudents} onCWPayments={expCWPayments} onAllPayments={expAllPayments} />}
        {page === 'settings' && <SettingsPage settings={settings} onSave={saveCfg} students={students} payments={payments} onClear={() => setConfClear(true)} onChangePassword={changePassword} onSignOut={signOut} onToast={tst} onOpenPromote={() => setShowPromote(true)} />}
      </main>

      <nav className="mnav">
        {tabs.map(t => (
          <button key={t.id} className={page === t.id ? 'on' : ''} onClick={() => go(t.id)}>
            <t.ic size={18} /><span>{t.l.split(' ')[0]}</span>
          </button>
        ))}
      </nav>

      {showEdit && editing && <StudentForm student={editing} settings={settings} existing={students} onClose={() => { setShowEdit(false); setEditing(null); }} onSave={updStudent} onToast={tst} />}

      {showPromote && <PromoteModal byClass={byClass} onClose={() => setShowPromote(false)} onPromote={promote} />}

      {confDel && (
        <div className="mov" onClick={() => setConfDel(null)}>
          <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div className="mh"><div className="mt">Remove student?</div><button className="mc" onClick={() => setConfDel(null)}><X size={18} /></button></div>
            <div className="mb"><div className="cft">This will permanently delete <strong>{students.find(s => s.id === confDel)?.fullName}</strong> and all their payment records. This can't be undone.</div></div>
            <div className="mf">
              <button className="btn bg" onClick={() => setConfDel(null)}>Cancel</button>
              <button className="btn bw" onClick={() => delStudent(confDel)}><Trash2 size={14} /> Delete</button>
            </div>
          </div>
        </div>
      )}

      {confClear && (
        <div className="mov" onClick={() => setConfClear(false)}>
          <div className="modal" style={{ maxWidth: 460 }} onClick={e => e.stopPropagation()}>
            <div className="mh"><div className="mt">Erase all data?</div><button className="mc" onClick={() => setConfClear(false)}><X size={18} /></button></div>
            <div className="mb"><div className="cft">This permanently deletes <strong>all {students.length} student(s)</strong> and <strong>all {payments.length} payment(s)</strong> (and their photos). Export a backup first. This can't be undone.</div></div>
            <div className="mf">
              <button className="btn bg" onClick={() => setConfClear(false)}>Cancel</button>
              <button className="btn bw" onClick={async () => {
                // Delete all photos too
                await Promise.all(students.map(s => s.hasPhoto ? deletePhoto(s.id) : null));
                await saveStudentsRaw([]); await savePy([]);
                setConfClear(false); tst('All data erased');
              }}><Trash2 size={14} /> Yes, erase everything</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={`toast ${toast.type === 'err' ? 'err' : ''}`}>{toast.type === 'err' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />} {toast.msg}</div>}
    </div>
  );
}

/* AUTH */
function SetupScreen({ onSetup, schoolName }) {
  const [pw, setPw] = useState(''); const [pw2, setPw2] = useState('');
  const [show, setShow] = useState(false); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const submit = async () => {
    setErr('');
    if (pw.length < 4) { setErr('Password must be at least 4 characters'); return; }
    if (pw !== pw2) { setErr("Passwords don't match"); return; }
    setBusy(true);
    try { await onSetup(pw); } catch (e) { setErr('Could not set password'); setBusy(false); }
  };
  return (
    <div className="app">
      <style>{CSS}</style>
      <div className="auth"><div className="auth-inner">
        <div className="auth-crest">{crestInitial(schoolName)}</div>
        <div className="auth-school">{schoolName}</div>
        <div className="auth-tag">Admin Portal</div>
        <div className="auth-greet">Welcome</div>
        <div className="auth-prompt">Set a password to protect access to your student registry. You'll need this every time you sign in.</div>
        {err && <div className="auth-error"><AlertCircle size={15} /> {err}</div>}
        <div className="auth-info"><ShieldCheck size={15} style={{ flexShrink: 0, marginTop: 1 }} /> Choose something only you know. If you forget it, you'll lose access to your data.</div>
        <div className="auth-form">
          <div className="auth-field">
            <input type={show ? 'text' : 'password'} placeholder="Create a password" value={pw} onChange={e => setPw(e.target.value)} autoFocus onKeyDown={e => e.key === 'Enter' && submit()} />
            <button className="auth-eye" type="button" onClick={() => setShow(!show)}>{show ? <EyeOff size={17} /> : <Eye size={17} />}</button>
          </div>
          <div className="auth-field"><input type={show ? 'text' : 'password'} placeholder="Confirm password" value={pw2} onChange={e => setPw2(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} /></div>
          <button className="auth-btn" onClick={submit} disabled={busy || !pw || !pw2}><KeyRound size={15} /> {busy ? 'Setting up…' : 'Set Password & Enter'}</button>
        </div>
        <div className="auth-foot"><strong>Private & local.</strong> Your password is hashed and stored only on your account.</div>
      </div></div>
    </div>
  );
}

function LoginScreen({ onLogin, schoolName }) {
  const [pw, setPw] = useState(''); const [show, setShow] = useState(false);
  const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const submit = async () => {
    setErr('');
    if (!pw) { setErr('Enter your password'); return; }
    setBusy(true);
    const ok = await onLogin(pw);
    if (!ok) { setErr('Incorrect password'); setBusy(false); setPw(''); }
  };
  return (
    <div className="app">
      <style>{CSS}</style>
      <div className="auth"><div className="auth-inner">
        <div className="auth-crest">{crestInitial(schoolName)}</div>
        <div className="auth-school">{schoolName}</div>
        <div className="auth-tag">Admin Portal</div>
        <div className="auth-greet">Welcome back</div>
        <div className="auth-prompt">Sign in to access the student registry.</div>
        {err && <div className="auth-error"><AlertCircle size={15} /> {err}</div>}
        <div className="auth-form">
          <div className="auth-field">
            <input type={show ? 'text' : 'password'} placeholder="Enter your password" value={pw} onChange={e => setPw(e.target.value)} autoFocus onKeyDown={e => e.key === 'Enter' && submit()} />
            <button className="auth-eye" type="button" onClick={() => setShow(!show)}>{show ? <EyeOff size={17} /> : <Eye size={17} />}</button>
          </div>
          <button className="auth-btn" onClick={submit} disabled={busy || !pw}><Lock size={15} /> {busy ? 'Signing in…' : 'Sign In'}</button>
        </div>
        <div className="auth-foot">Access restricted to authorised staff.</div>
      </div></div>
    </div>
  );
}

/* DASHBOARD */
function Dashboard({ stats, settings, students, payments, byClass, onGo, onOpen }) {
  const recent = useMemo(() => [...payments].sort((a, b) => (b.paidDate || '').localeCompare(a.paidDate || '')).slice(0, 6), [payments]);
  return (
    <>
      <div className="ph">
        <div><h1 className="pt">Dashboard</h1><div className="ps">A snapshot of your school today.</div></div>
        <div className="acts"><button className="btn bp" onClick={() => onGo('add')}><UserPlus size={15} /> Add Student</button></div>
      </div>
      <div className="stats">
        <div className="stat"><div className="sl"><Users size={13} /> Total Students</div><div className="sv">{stats.tStud}</div><div className="sf">Across {CLASSES.filter(c => byClass[c].length).length} classes</div></div>
        <div className="stat"><div className="sl"><Wallet size={13} /> Collected ({new Date().getFullYear()})</div><div className="sv"><span className="cur">{settings.currency}</span>{stats.yColl.toLocaleString()}</div><div className="sf">{payments.length} payment(s) recorded</div></div>
        <div className="stat"><div className="sl"><AlertCircle size={13} /> Outstanding (Year)</div><div className="sv" style={{ color: stats.out > 0 ? '#8B2E2E' : '#386641' }}><span className="cur">{settings.currency}</span>{stats.out.toLocaleString()}</div><div className="sf">Tuition expected: {fmt(stats.expY, settings.currency)}</div></div>
        <div className="stat"><div className="sl"><TrendingUp size={13} /> Monthly Tuition Expected</div><div className="sv"><span className="cur">{settings.currency}</span>{stats.expM.toLocaleString()}</div><div className="sf">If all students pay monthly fee</div></div>
      </div>
      {students.length === 0 ? (
        <div className="em">
          <div className="ei"><GraduationCap size={26} /></div>
          <div className="et">Begin your registry</div>
          <div className="es">Add your first student to start tracking enrollment and fees.</div>
          <button className="btn bp lg" onClick={() => onGo('add')}><UserPlus size={15} /> Add your first student</button>
        </div>
      ) : (
        <>
          <div className="sec">Enrollment by class <span className="c">{stats.tStud} students</span></div>
          <div className="card" style={{ padding: 16, marginBottom: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 8 }}>
              {CLASSES.map(c => {
                const n = byClass[c].length;
                return (
                  <div key={c} onClick={() => onGo('students')} style={{ background: n ? '#D8E5D5' : '#FAFBF7', border: `1px solid ${n ? 'rgba(27,67,50,.15)' : '#E6ECE1'}`, borderRadius: 7, padding: '12px 14px', cursor: 'pointer' }}>
                    <div style={{ fontSize: 11, color: n ? '#1B4332' : '#5C6B5F', fontWeight: 500, letterSpacing: '.04em', textTransform: 'uppercase' }}>Class {c}</div>
                    <div className="serif" style={{ fontSize: 22, marginTop: 4, fontWeight: 500, color: n ? '#0B1A12' : '#8B9A8E' }}>{n}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="sec">Recent payments <span className="c">Last 6</span></div>
          {recent.length === 0 ? <div className="em" style={{ padding: '32px 24px' }}><div className="es" style={{ marginBottom: 0 }}>No payments recorded yet.</div></div> :
            <div className="list">
              {recent.map(p => {
                const s = students.find(x => x.id === p.studentId);
                const ptype = p.paymentType || PT_MONTHLY;
                return (
                  <div key={p.id} className="lr" onClick={() => s && onOpen(s.id)} style={{ gridTemplateColumns: 'auto minmax(0,2fr) minmax(0,1fr) auto 32px' }}>
                    <Avatar student={s} />
                    <div className="cnt"><div className="n">{s?.fullName || 'Unknown'}</div><div className="m">{s?.studentClass ? `Class ${s.studentClass}` : ''} {s?.rollNumber ? `· Roll ${s.rollNumber}` : ''} · {ptype}</div></div>
                    <div style={{ fontSize: 12.5, color: '#5C6B5F' }}>{p.month ? `${p.month.slice(0, 3)} ` : ''}{p.year}</div>
                    <div className="pa">+{fmt(p.amount, settings.currency)}</div>
                    <ChevronRight size={16} className="chev" />
                  </div>
                );
              })}
            </div>}
        </>
      )}
    </>
  );
}

/* STUDENTS LIST */
function StudentsList({ students, byClass, settings, byStudent, selClass, setSelClass, onOpen, onAdd, onDownloadAll, onDownloadClass, onDownloadAllCW, onPromote }) {
  const [q, setQ] = useState('');
  const list = useMemo(() => {
    let l = selClass === 'All' ? CLASSES.flatMap(c => byClass[c]) : (byClass[selClass] || []);
    if (q.trim()) {
      const s = q.toLowerCase();
      l = l.filter(x => x.fullName?.toLowerCase().includes(s) || x.rollNumber?.toString().includes(s) || x.parentName?.toLowerCase().includes(s) || x.motherName?.toLowerCase().includes(s) || x.parentPhone?.includes(s) || x.motherPhone?.includes(s));
    }
    return l;
  }, [byClass, selClass, q]);

  return (
    <>
      <div className="ph">
        <div><h1 className="pt">Students</h1><div className="ps">{students.length} students · Browse by class</div></div>
        <div className="acts">
          {students.length > 0 && <button className="btn bg" onClick={onPromote} title="Move students from one class to another"><ArrowRightCircle size={14} /> Promote</button>}
          {students.length > 0 && (
            selClass === 'All'
              ? <>
                  <button className="btn bg" onClick={onDownloadAll}><FileDown size={14} /> All</button>
                  <button className="btn bg" onClick={onDownloadAllCW}><FileDown size={14} /> Classwise</button>
                </>
              : <button className="btn bg" onClick={() => onDownloadClass(selClass)}><FileDown size={14} /> Class {selClass}</button>
          )}
          <button className="btn bp" onClick={onAdd}><UserPlus size={15} /> Add</button>
        </div>
      </div>

      <div className="ctabs">
        <button className={`ct all ${selClass === 'All' ? 'on' : ''}`} onClick={() => setSelClass('All')}>All Classes <span className="b">{students.length}</span></button>
        {CLASSES.map(c => <button key={c} className={`ct ${selClass === c ? 'on' : ''}`} onClick={() => setSelClass(c)}>{c} <span className="b">{byClass[c].length}</span></button>)}
      </div>

      {students.length > 0 && <div className="tb"><div className="sr"><Search size={15} /><input placeholder="Search by name, roll no, or parent…" value={q} onChange={e => setQ(e.target.value)} /></div></div>}

      {list.length === 0 ? (
        students.length === 0 ? (
          <div className="em">
            <div className="ei"><Users size={26} /></div>
            <div className="et">No students yet</div>
            <div className="es">Add your first student to build the registry.</div>
            <button className="btn bp" onClick={onAdd}><UserPlus size={15} /> Add Student</button>
          </div>
        ) : <div className="em"><div className="es" style={{ marginBottom: 0 }}>{q ? `No students match "${q}"` : `No students enrolled in Class ${selClass}`}</div></div>
      ) : (
        <div className="list">
          <div className="lr h"><div className="lh">Roll</div><div className="lh">Student</div><div className="lh">Parent Contact</div><div className="lh">Paid (Year)</div><div></div></div>
          {list.map(s => {
            const sp = byStudent[s.id] || [];
            const yr = new Date().getFullYear();
            const yp = sp.filter(p => p.year == yr).reduce((a, p) => a + (+p.amount || 0), 0);
            return (
              <div key={s.id} className="lr" onClick={() => onOpen(s.id)}>
                <div className="rn">{s.rollNumber || '—'}</div>
                <div className="cn">
                  <Avatar student={s} />
                  <div className="cnt"><div className="n">{s.fullName}</div><div className="m">Class {s.studentClass} {s.gender ? `· ${s.gender}` : ''}</div></div>
                </div>
                <div className="cc">{s.parentPhone || s.motherPhone || s.parentName || '—'}</div>
                <div className={`cb ${yp > 0 ? 'p' : ''}`}>{yp > 0 ? fmt(yp, settings.currency) : '—'}</div>
                <ChevronRight size={16} className="chev" />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

/* STUDENT DETAIL */
function StudentDetail({ student, settings, payments, vYear, setVYear, onBack, onEdit, onDelete, onDelPay, onRecord }) {
  const yp = payments.filter(p => p.year == vYear);
  const monthlyPay = yp.filter(p => (p.paymentType || PT_MONTHLY) === PT_MONTHLY);
  const mTot = useMemo(() => { const m = {}; MONTHS.forEach(x => m[x] = 0); monthlyPay.forEach(p => m[p.month] = (m[p.month] || 0) + (+p.amount || 0)); return m; }, [monthlyPay]);
  const sessionPaid = yp.filter(p => p.paymentType === PT_SESSION).reduce((a, p) => a + (+p.amount || 0), 0);
  const t1Paid = yp.filter(p => p.paymentType === PT_T1).reduce((a, p) => a + (+p.amount || 0), 0);
  const t2Paid = yp.filter(p => p.paymentType === PT_T2).reduce((a, p) => a + (+p.amount || 0), 0);
  const tfPaid = yp.filter(p => p.paymentType === PT_TF).reduce((a, p) => a + (+p.amount || 0), 0);
  const tPaid = yp.reduce((a, p) => a + (+p.amount || 0), 0);
  const monthlyPaidTot = monthlyPay.reduce((a, p) => a + (+p.amount || 0), 0);
  const mFee = +student.monthlyFee || 0;
  const sFee = +student.sessionFee || 0;
  const expM = mFee * 12;
  const bal = Math.max(0, expM - monthlyPaidTot);
  const stat = (mo) => { const p = mTot[mo] || 0; if (!p) return ''; if (mFee > 0 && p >= mFee) return 'pd'; if (p > 0) return 'pt'; return ''; };
  const sessionStat = sFee > 0 ? (sessionPaid >= sFee ? 'pd' : sessionPaid > 0 ? 'pt' : '') : (sessionPaid > 0 ? 'pd' : '');
  const termStat = (paid) => paid > 0 ? 'pd' : '';
  const years = useMemo(() => { const y = new Set([new Date().getFullYear(), +settings.academicYear]); payments.forEach(p => y.add(+p.year)); return [...y].filter(x => !isNaN(x)).sort((a, b) => b - a); }, [payments, settings.academicYear]);

  return (
    <>
      <button className="bk" onClick={onBack}><ArrowLeft size={14} /> Back to students</button>
      <div className="dh">
        <Avatar student={student} size="lg" />
        <div className="di">
          <div className="dn">{student.fullName}</div>
          <div className="dt">
            <span className="tg r"><BookOpen size={11} /> Class {student.studentClass}</span>
            <span className="tg"><Hash size={11} /> Roll {student.rollNumber || '—'}</span>
            {student.gender && <span className="tg">{student.gender}</span>}
            {student.dob && <span className="tg"><Calendar size={11} /> {student.dob}</span>}
          </div>
        </div>
        <div className="dax">
          <button className="btn bg sm" onClick={onEdit}><Edit2 size={13} /> Edit</button>
          <button className="btn bd sm" onClick={onDelete}><Trash2 size={13} /></button>
        </div>
      </div>

      <div className="pn">
        <div className="card">
          <div className="ctit"><BookOpen size={16} /> Academic</div>
          <div className="ir"><div className="l">Class</div><div className="v">{student.studentClass}</div></div>
          <div className="ir"><div className="l">Roll Number</div><div className="v">{student.rollNumber || '—'}</div></div>
          {student.gender && <div className="ir"><div className="l">Gender</div><div className="v">{student.gender}</div></div>}
          {student.dob && <div className="ir"><div className="l">Date of Birth</div><div className="v">{student.dob}</div></div>}
          {student.enrollmentDate && <div className="ir"><div className="l">Enrolled</div><div className="v">{student.enrollmentDate}</div></div>}
          <div className="ir"><div className="l">Monthly Fee</div><div className="v mono">{fmt(student.monthlyFee || 0, settings.currency)}</div></div>
          <div className="ir"><div className="l">Session Fee</div><div className="v mono">{fmt(student.sessionFee || 0, settings.currency)}</div></div>
          {student.notes && <div className="ir"><div className="l">Notes</div><div className="v">{student.notes}</div></div>}
        </div>
        <div className="card">
          <div className="ctit"><Phone size={16} /> Contact</div>
          {student.parentName && <div className="ir"><div className="l">Father / Guardian</div><div className="v">{student.parentName}</div></div>}
          {student.parentPhone && <div className="ir"><div className="l">Father's Phone</div><div className="v">{student.parentPhone}</div></div>}
          {student.motherName && <div className="ir"><div className="l">Mother</div><div className="v">{student.motherName}</div></div>}
          {student.motherPhone && <div className="ir"><div className="l">Mother's Phone</div><div className="v">{student.motherPhone}</div></div>}
          {student.address && <div className="ir"><div className="l">Address</div><div className="v">{student.address}</div></div>}
          {!student.parentName && !student.parentPhone && !student.motherName && !student.motherPhone && !student.address && <div style={{ color: '#5C6B5F', fontSize: 13.5, padding: '6px 0' }}>No contact details on file.</div>}
        </div>
      </div>

      <div className="card">
        <div className="ctit" style={{ justifyContent: 'space-between', display: 'flex', marginBottom: 4 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CircleDollarSign size={16} /> Fees</span>
          <button className="btn bp sm" onClick={onRecord}><Plus size={13} /> Record Payment</button>
        </div>
        <div className="yr">
          <label style={{ fontSize: 12, color: '#5C6B5F', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.06em' }}>Year</label>
          <select value={vYear} onChange={e => setVYear(+e.target.value)}>{years.map(y => <option key={y} value={y}>{y}</option>)}</select>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 14, fontSize: 12.5, color: '#5C6B5F', flexWrap: 'wrap' }}>
            <span>Total paid: <strong className="mono" style={{ color: '#386641' }}>{fmt(tPaid, settings.currency)}</strong></span>
            {expM > 0 && <span>Monthly balance: <strong className="mono" style={{ color: bal > 0 ? '#8B2E2E' : '#386641' }}>{fmt(bal, settings.currency)}</strong></span>}
          </div>
        </div>

        <div className="ctit" style={{ fontSize: 14, marginTop: 6, marginBottom: 10, color: '#1F3024' }}><Award size={14} /> Session & Term Exam Fees</div>
        <div className="sfg">
          <div className={`sfb ${sessionStat}`}><div className="ttl">Session Fee</div><div className="amt">{fmt(sessionPaid, settings.currency)}</div><div className="ext">{sFee > 0 ? `Target: ${fmt(sFee, settings.currency)}` : 'No target set'}</div></div>
          <div className={`sfb ${termStat(t1Paid)}`}><div className="ttl">First Term</div><div className="amt">{fmt(t1Paid, settings.currency)}</div><div className="ext">{t1Paid > 0 ? 'Recorded' : 'Not paid'}</div></div>
          <div className={`sfb ${termStat(t2Paid)}`}><div className="ttl">Second Term</div><div className="amt">{fmt(t2Paid, settings.currency)}</div><div className="ext">{t2Paid > 0 ? 'Recorded' : 'Not paid'}</div></div>
          <div className={`sfb ${termStat(tfPaid)}`}><div className="ttl">Final Term</div><div className="amt">{fmt(tfPaid, settings.currency)}</div><div className="ext">{tfPaid > 0 ? 'Recorded' : 'Not paid'}</div></div>
        </div>

        <div className="ctit" style={{ fontSize: 14, marginTop: 18, marginBottom: 10, color: '#1F3024' }}><Calendar size={14} /> Monthly Tuition</div>
        <div style={{ fontSize: 12.5, color: '#5C6B5F', marginBottom: 12 }}>Green = fully paid · Olive = partial · Empty = unpaid</div>
        <div className="mg">
          {MONTHS.map((m, i) => {
            const st = stat(m); const amt = mTot[m];
            return (
              <div key={m} className={`mcell ${st}`}>
                <div className="mn">{M_SHORT[i]}</div>
                <div className="ma">{amt > 0 ? fmt(amt, settings.currency) : '—'}</div>
                {st === 'pd' && <CheckCircle2 size={13} className="ms" />}
                {st === 'pt' && <Clock size={13} className="ms" />}
              </div>
            );
          })}
        </div>

        <div style={{ height: 22 }}></div>
        <div className="ctit" style={{ fontSize: 15, marginBottom: 10 }}>Payment history</div>
        {payments.length === 0 ? <div style={{ color: '#5C6B5F', fontSize: 13.5, padding: '10px 0' }}>No payments recorded yet.</div> :
          <div className="pl">
            <div className="pr h"><div className="lh">Type / Description</div><div className="lh">Period</div><div className="lh" style={{ textAlign: 'right' }}>Amount</div><div></div></div>
            {[...payments].sort((a, b) => (b.paidDate || '').localeCompare(a.paidDate || '')).map(p => {
              const pt = p.paymentType || PT_MONTHLY;
              const tagCls = pt === PT_SESSION ? 's' : TERM_TYPES.includes(pt) ? 't' : '';
              const tagText = pt === PT_MONTHLY ? `${p.month?.slice(0, 3) || ''} ${p.year}` : `${p.month || pt} ${p.year}`;
              return (
                <div key={p.id} className="pr">
                  <div className="pi"><div className="p1">{pt}{p.description ? ` · ${p.description}` : ''}</div><div className="p2">{p.paidDate} {p.method ? `· ${p.method}` : ''}</div></div>
                  <span className={`pm ${tagCls}`}>{tagText}</span>
                  <div className="pa">+{fmt(p.amount, settings.currency)}</div>
                  <button className="pd" onClick={() => onDelPay(p.id)}><Trash2 size={14} /></button>
                </div>
              );
            })}
          </div>}
      </div>
    </>
  );
}

/* PHOTO UPLOADER */
function PhotoUploader({ photo, onChange, onToast }) {
  const fileRef = useRef();
  const [busy, setBusy] = useState(false);
  const pick = () => fileRef.current?.click();
  const handle = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) { onToast?.('Image too large (max 8MB)', 'err'); return; }
    setBusy(true);
    try { const dataUrl = await compressImage(file); onChange(dataUrl); }
    catch (err) { onToast?.('Could not process image', 'err'); }
    setBusy(false);
    if (fileRef.current) fileRef.current.value = '';
  };
  return (
    <div className="phup">
      <div className="phpre" onClick={pick}>
        {photo ? <img src={photo} alt="Student" /> : <Camera size={28} />}
      </div>
      <div className="phinfo">
        <div className="h">Student Photo</div>
        <div className="s">Tap the circle to {photo ? 'change' : 'upload'} a photo. It'll be resized automatically.</div>
        <div className="phacts">
          <button type="button" className="btn bg sm" onClick={pick} disabled={busy}>
            <Upload size={13} /> {busy ? 'Processing…' : (photo ? 'Change Photo' : 'Upload Photo')}
          </button>
          {photo && <button type="button" className="btn bd sm" onClick={() => onChange('')}><X size={13} /> Remove</button>}
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handle} style={{ display: 'none' }} />
    </div>
  );
}

/* ADD STUDENT */
function AddStudent({ settings, existing, onAdd, onView, onToast }) {
  const init = () => ({
    photo: '', fullName: '', studentClass: '', rollNumber: '', gender: '', dob: '',
    enrollmentDate: today(), parentName: '', parentPhone: '', motherName: '', motherPhone: '',
    address: '', monthlyFee: settings.defaultMonthlyFee || 0, sessionFee: settings.defaultSessionFee || 0, notes: ''
  });
  const [f, setF] = useState(init);
  const [n, setN] = useState(0);
  const s = (k, v) => setF(x => ({ ...x, [k]: v }));
  const warn = useMemo(() => {
    if (!f.studentClass || !f.rollNumber) return null;
    const c = existing.find(x => x.studentClass === f.studentClass && x.rollNumber?.toString() === f.rollNumber?.toString());
    return c ? `Roll ${f.rollNumber} is already used by ${c.fullName} in Class ${f.studentClass}` : null;
  }, [f.studentClass, f.rollNumber, existing]);
  const sug = useMemo(() => {
    if (!f.studentClass) return null;
    const u = existing.filter(x => x.studentClass === f.studentClass).map(x => parseInt(x.rollNumber) || 0);
    return u.length ? Math.max(...u) + 1 : 1;
  }, [f.studentClass, existing]);
  const can = f.fullName.trim() && f.studentClass;
  const sub = async () => {
    if (!can) return;
    await onAdd({ ...f, fullName: f.fullName.trim(), monthlyFee: +f.monthlyFee || 0, sessionFee: +f.sessionFee || 0 });
    setF({ ...init(), studentClass: f.studentClass });
    setN(x => x + 1);
  };

  return (
    <>
      <div className="ph">
        <div><h1 className="pt">Add Student</h1><div className="ps">New entries are filed under the class you select.</div></div>
        <div className="acts"><button className="btn bg" onClick={onView}><Users size={15} /> View all students</button></div>
      </div>

      <div className="fs">
        <div className="fst"><User size={16} /> Photo & Identity</div>
        <div className="fss">Add a photo so you can recognize the student at a glance.</div>
        <PhotoUploader photo={f.photo} onChange={(p) => s('photo', p)} onToast={onToast} />
        <div className="fd"><label>Full Name <span className="rq">*</span></label><input value={f.fullName} onChange={e => s('fullName', e.target.value)} placeholder="e.g. Aisha Khan" autoFocus /></div>
      </div>

      <div className="fs">
        <div className="fst"><GraduationCap size={16} /> Academic Details</div>
        <div className="fss">Required to file the student in the right class.</div>
        <div className="fr2">
          <div className="fd"><label>Class <span className="rq">*</span></label>
            <select value={f.studentClass} onChange={e => s('studentClass', e.target.value)}>
              <option value="">— Select class —</option>
              {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="fd"><label>Roll Number</label>
            <input type="number" value={f.rollNumber} onChange={e => s('rollNumber', e.target.value)} placeholder={sug ? `Next: ${sug}` : 'e.g. 1'} />
            {warn && <div className="wn"><AlertCircle size={13} /> {warn}</div>}
          </div>
        </div>
        <div className="fr3">
          <div className="fd"><label>Gender</label>
            <select value={f.gender} onChange={e => s('gender', e.target.value)}>
              <option value="">—</option><option>Female</option><option>Male</option><option>Other</option>
            </select>
          </div>
          <div className="fd"><label>Date of Birth</label><input type="date" value={f.dob} onChange={e => s('dob', e.target.value)} /></div>
          <div className="fd"><label>Enrolled On</label><input type="date" value={f.enrollmentDate} onChange={e => s('enrollmentDate', e.target.value)} /></div>
        </div>
        <div className="fr2">
          <div className="fd"><label>Monthly Fee ({settings.currency})</label><input type="number" value={f.monthlyFee} onChange={e => s('monthlyFee', e.target.value)} placeholder="0" /><div className="hi">Tuition fee charged each month.</div></div>
          <div className="fd"><label>Session Fee ({settings.currency})</label><input type="number" value={f.sessionFee} onChange={e => s('sessionFee', e.target.value)} placeholder="0" /><div className="hi">One-time fee for the academic session.</div></div>
        </div>
      </div>

      <div className="fs">
        <div className="fst"><Phone size={16} /> Parents / Guardian</div>
        <div className="fss">Contact details for fee follow-ups and emergencies.</div>
        <div className="fr2">
          <div className="fd"><label>Father / Guardian Name</label><input value={f.parentName} onChange={e => s('parentName', e.target.value)} placeholder="Full name" /></div>
          <div className="fd"><label>Father's Phone</label><input value={f.parentPhone} onChange={e => s('parentPhone', e.target.value)} placeholder="+880 1XXX XXXXXX" /></div>
        </div>
        <div className="fr2">
          <div className="fd"><label>Mother's Name</label><input value={f.motherName} onChange={e => s('motherName', e.target.value)} placeholder="Full name" /></div>
          <div className="fd"><label>Mother's Phone</label><input value={f.motherPhone} onChange={e => s('motherPhone', e.target.value)} placeholder="+880 1XXX XXXXXX" /></div>
        </div>
        <div className="fd"><label>Home Address</label><textarea value={f.address} onChange={e => s('address', e.target.value)} placeholder="Street, area, city" /></div>
        <div className="fd"><label>Notes</label><textarea value={f.notes} onChange={e => s('notes', e.target.value)} placeholder="Allergies, special needs, anything to remember…" /></div>
      </div>

      <div style={{ marginTop: 18, display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        {n > 0 && <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#386641', fontSize: 13, marginRight: 'auto' }}><CheckCircle2 size={15} /> {n} student{n === 1 ? '' : 's'} added in this session</div>}
        <button className="btn bp lg" onClick={sub} disabled={!can}><Plus size={15} /> Add Student</button>
      </div>
    </>
  );
}

/* PAYMENTS */
function Payments({ students, payments, settings, byClass, fClass, setFClass, fMonth, setFMonth, fType, setFType, onAdd, onDel, onOpen, onDownloadAll, onDownloadClass, onDownloadAllCW }) {
  const [f, setF] = useState({
    studentClass: '', studentId: '', paymentType: PT_MONTHLY,
    month: MONTHS[new Date().getMonth()], year: new Date().getFullYear(),
    amount: '', method: 'Cash', description: '', paidDate: today()
  });
  const s = (k, v) => setF(x => ({ ...x, [k]: v }));
  useEffect(() => { s('studentId', ''); }, [f.studentClass]);
  const inCls = f.studentClass ? (byClass[f.studentClass] || []) : [];
  const selS = f.studentId ? students.find(x => x.id === f.studentId) : null;
  useEffect(() => {
    if (!selS) return;
    if (f.paymentType === PT_MONTHLY) s('amount', selS.monthlyFee || '');
    else if (f.paymentType === PT_SESSION) s('amount', selS.sessionFee || '');
    else s('amount', '');
  }, [f.studentId, f.paymentType]);
  const can = f.studentId && f.year && +f.amount > 0 && (f.paymentType !== PT_MONTHLY || f.month);
  const sub = () => {
    if (!can) return;
    const monthValue = f.paymentType === PT_MONTHLY ? f.month : (f.paymentType === PT_SESSION ? 'Session' : f.paymentType === PT_T1 ? 'First Term' : f.paymentType === PT_T2 ? 'Second Term' : f.paymentType === PT_TF ? 'Final Term' : '');
    onAdd({ studentId: f.studentId, paymentType: f.paymentType, month: monthValue, year: +f.year, amount: +f.amount, method: f.method, description: f.description, paidDate: f.paidDate });
    setF(x => ({ ...x, amount: '', description: '' }));
  };

  const filt = useMemo(() => {
    let l = [...payments];
    if (fClass !== 'All') { const ids = (byClass[fClass] || []).map(x => x.id); l = l.filter(p => ids.includes(p.studentId)); }
    if (fMonth !== 'All') l = l.filter(p => p.month === fMonth);
    if (fType !== 'All') l = l.filter(p => (p.paymentType || PT_MONTHLY) === fType);
    return l.sort((a, b) => (b.paidDate || '').localeCompare(a.paidDate || ''));
  }, [payments, fClass, fMonth, fType, byClass]);

  const tot = filt.reduce((a, p) => a + (+p.amount || 0), 0);

  return (
    <>
      <div className="ph">
        <div><h1 className="pt">Payments</h1><div className="ps">Record fees by type and period.</div></div>
        <div className="acts">
          {payments.length > 0 && (
            fClass === 'All'
              ? <>
                  <button className="btn bg" onClick={onDownloadAll}><FileDown size={14} /> All</button>
                  <button className="btn bg" onClick={onDownloadAllCW}><FileDown size={14} /> Classwise</button>
                </>
              : <button className="btn bg" onClick={() => onDownloadClass(fClass)}><FileDown size={14} /> Class {fClass}</button>
          )}
        </div>
      </div>

      <div className="fs">
        <div className="fst"><Banknote size={16} /> Record New Payment</div>
        <div className="fss">Pick the class, student, payment type, then fill in the amount.</div>
        <div className="fr2">
          <div className="fd"><label>Class <span className="rq">*</span></label>
            <select value={f.studentClass} onChange={e => s('studentClass', e.target.value)}>
              <option value="">— Select class —</option>
              {CLASSES.map(c => <option key={c} value={c} disabled={!byClass[c].length}>{c} ({byClass[c].length})</option>)}
            </select>
          </div>
          <div className="fd"><label>Student <span className="rq">*</span></label>
            <select value={f.studentId} onChange={e => s('studentId', e.target.value)} disabled={!f.studentClass}>
              <option value="">{f.studentClass ? '— Select student —' : 'Select class first'}</option>
              {inCls.map(x => <option key={x.id} value={x.id}>Roll {x.rollNumber || '?'} · {x.fullName}</option>)}
            </select>
          </div>
        </div>

        <div className="fd"><label>Payment For <span className="rq">*</span></label>
          <select value={f.paymentType} onChange={e => s('paymentType', e.target.value)}>
            {PAYMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <div className="hi">Choose Monthly Tuition for regular fees, or Session/Term for special payments.</div>
        </div>

        <div className="fr3">
          {f.paymentType === PT_MONTHLY ? (
            <div className="fd"><label>For Month <span className="rq">*</span></label>
              <select value={f.month} onChange={e => s('month', e.target.value)}>{MONTHS.map(m => <option key={m} value={m}>{m}</option>)}</select>
            </div>
          ) : (
            <div className="fd"><label>Period</label>
              <input value={f.paymentType === PT_SESSION ? 'Session' : f.paymentType === PT_T1 ? 'First Term' : f.paymentType === PT_T2 ? 'Second Term' : f.paymentType === PT_TF ? 'Final Term' : 'Other'} disabled />
            </div>
          )}
          <div className="fd"><label>Year <span className="rq">*</span></label><input type="number" value={f.year} onChange={e => s('year', e.target.value)} /></div>
          <div className="fd"><label>Paid On</label><input type="date" value={f.paidDate} onChange={e => s('paidDate', e.target.value)} /></div>
        </div>

        <div className="fr2">
          <div className="fd"><label>Amount ({settings.currency}) <span className="rq">*</span></label>
            <input type="number" value={f.amount} onChange={e => s('amount', e.target.value)} placeholder="0" />
          </div>
          <div className="fd"><label>Method</label>
            <select value={f.method} onChange={e => s('method', e.target.value)}>
              <option>Cash</option><option>Bank transfer</option><option>Card</option><option>Cheque</option><option>Mobile money</option><option>Other</option>
            </select>
          </div>
        </div>
        <div className="fd"><label>Description (optional)</label>
          <input value={f.description} onChange={e => s('description', e.target.value)} placeholder="e.g. tuition for term 1, late fine, etc." />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
          <button className="btn bp lg" onClick={sub} disabled={!can}><Check size={15} /> Save Payment</button>
        </div>
      </div>

      <div style={{ height: 28 }}></div>
      <div className="sec">Payment history <span className="c">{filt.length} entries · {fmt(tot, settings.currency)} total</span></div>

      {payments.length === 0 ? (
        <div className="em">
          <div className="ei"><Banknote size={26} /></div>
          <div className="et">No payments yet</div>
          <div className="es">Record your first payment using the form above.</div>
        </div>
      ) : (
        <>
          <div className="tb">
            <select value={fClass} onChange={e => setFClass(e.target.value)} style={{ padding: '11px 14px', borderRadius: 7, border: '1px solid #D4DDD0', background: '#FFFFFF', fontSize: 14, fontFamily: 'inherit', color: '#0B1A12' }}>
              <option value="All">All Classes</option>
              {CLASSES.map(c => <option key={c} value={c}>Class {c}</option>)}
            </select>
            <select value={fType} onChange={e => setFType(e.target.value)} style={{ padding: '11px 14px', borderRadius: 7, border: '1px solid #D4DDD0', background: '#FFFFFF', fontSize: 14, fontFamily: 'inherit', color: '#0B1A12' }}>
              <option value="All">All Types</option>
              {PAYMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={fMonth} onChange={e => setFMonth(e.target.value)} style={{ padding: '11px 14px', borderRadius: 7, border: '1px solid #D4DDD0', background: '#FFFFFF', fontSize: 14, fontFamily: 'inherit', color: '#0B1A12' }}>
              <option value="All">All Months</option>
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {filt.length === 0 ? <div className="em"><div className="es" style={{ marginBottom: 0 }}>No payments match your filters.</div></div> :
            <div className="pl">
              <div className="pr h"><div className="lh">Student / Type</div><div className="lh">Period</div><div className="lh" style={{ textAlign: 'right' }}>Amount</div><div></div></div>
              {filt.map(p => {
                const st = students.find(x => x.id === p.studentId);
                const pt = p.paymentType || PT_MONTHLY;
                const tagCls = pt === PT_SESSION ? 's' : TERM_TYPES.includes(pt) ? 't' : '';
                const tagText = pt === PT_MONTHLY ? `${p.month?.slice(0, 3) || ''} ${p.year}` : `${p.month || pt} ${p.year}`;
                return (
                  <div key={p.id} className="pr">
                    <div className="pi" onClick={() => st && onOpen(st.id)} style={{ cursor: st ? 'pointer' : 'default' }}>
                      <div className="p1">{st?.fullName || 'Unknown student'} · <span style={{ color: '#5C6B5F', fontWeight: 400 }}>{pt}</span></div>
                      <div className="p2">{st?.studentClass ? `Class ${st.studentClass}` : ''} {st?.rollNumber ? `· Roll ${st.rollNumber}` : ''}{p.description ? ` · ${p.description}` : ''} · {p.paidDate}</div>
                    </div>
                    <span className={`pm ${tagCls}`}>{tagText}</span>
                    <div className="pa">+{fmt(p.amount, settings.currency)}</div>
                    <button className="pd" onClick={() => onDel(p.id)}><Trash2 size={14} /></button>
                  </div>
                );
              })}
            </div>}
        </>
      )}
    </>
  );
}

/* EXPORT */
function Export({ stats, settings, onCWStudents, onAllStudents, onCWPayments, onAllPayments }) {
  return (
    <>
      <div className="ph"><div><h1 className="pt">Export to Sheets</h1><div className="ps">Download CSVs and import them into Google Sheets.</div></div></div>

      <div className="sec">Students</div>
      <div className="eg">
        <div className="ec">
          <div className="top"><div className="ic"><FileSpreadsheet size={20} /></div><h3>All Students (Master File)</h3></div>
          <p>One CSV with every student across all classes. Becomes a single "Students" tab in Sheets.</p>
          <button className="btn bl" onClick={onAllStudents}><FileDown size={14} /> Download All Students</button>
        </div>
        <div className="ec r">
          <div className="top"><div className="ic"><FileSpreadsheet size={20} /></div><h3>Students — Classwise</h3></div>
          <p>One CSV per class (Play, Nursery, KG, One … Ten). Each becomes its own tab in your workbook.</p>
          <button className="btn bp" onClick={onCWStudents}><FileDown size={14} /> Download Classwise</button>
        </div>
      </div>

      <div style={{ height: 24 }}></div>
      <div className="sec">Payments</div>
      <div className="eg">
        <div className="ec b">
          <div className="top"><div className="ic"><FileSpreadsheet size={20} /></div><h3>All Payments (Master File)</h3></div>
          <p>Every payment recorded — student name, class, roll, type (monthly/session/term), period, amount.</p>
          <button className="btn bo" onClick={onAllPayments}><FileDown size={14} /> Download All Payments</button>
        </div>
        <div className="ec p">
          <div className="top"><div className="ic"><FileSpreadsheet size={20} /></div><h3>Payments — Classwise</h3></div>
          <p>One payment CSV per class. Useful if you want a separate payments tab for each class.</p>
          <button className="btn bp" onClick={onCWPayments}><FileDown size={14} /> Download Classwise</button>
        </div>
      </div>

      <div style={{ height: 18 }}></div>
      <div className="ec o">
        <div className="top"><div className="ic"><Info size={20} /></div><h3>Your data right now</h3></div>
        <p style={{ flex: 'unset', marginBottom: 12 }}>
          <strong>{stats.tStud}</strong> students enrolled · <strong>{fmt(stats.tColl, settings.currency)}</strong> total collected.
        </p>
        <div style={{ fontSize: 12.5, color: '#5C6B5F', lineHeight: 1.6 }}>
          Export creates a fresh CSV from in-app data. Repeat any time you need an updated Sheet. Photos aren't exported (CSVs only carry text).
        </div>
      </div>

      <div className="ins">
        <h4><Info size={15} /> How to put this into Google Sheets</h4>
        <ol>
          <li>Tap a button above to download a CSV file.</li>
          <li>Open Google Sheets and create (or open) your school workbook.</li>
          <li>Use <strong>File → Import → Upload</strong> and pick the CSV. Choose "Insert new sheet(s)" to keep older tabs intact.</li>
          <li>For classwise downloads, repeat for each class file — each becomes its own tab.</li>
          <li>Whenever data changes here, just export again and re-import to refresh.</li>
        </ol>
      </div>
    </>
  );
}

/* SETTINGS */
function SettingsPage({ settings, onSave, students, payments, onClear, onChangePassword, onSignOut, onToast, onOpenPromote }) {
  const [l, setL] = useState(settings);
  useEffect(() => setL(settings), [settings]);
  const s = (k, v) => { const n = { ...l, [k]: v }; setL(n); onSave(n); };

  const [pwOld, setPwOld] = useState('');
  const [pwNew, setPwNew] = useState('');
  const [pwNew2, setPwNew2] = useState('');
  const [pwBusy, setPwBusy] = useState(false);

  const submitPw = async () => {
    if (!pwOld || !pwNew) return;
    if (pwNew.length < 4) { onToast('New password must be at least 4 characters', 'err'); return; }
    if (pwNew !== pwNew2) { onToast("New passwords don't match", 'err'); return; }
    setPwBusy(true);
    const res = await onChangePassword(pwOld, pwNew);
    setPwBusy(false);
    if (res.ok) { onToast('Password changed successfully'); setPwOld(''); setPwNew(''); setPwNew2(''); }
    else onToast(res.msg, 'err');
  };

  return (
    <>
      <div className="ph"><div><h1 className="pt">Settings</h1><div className="ps">School details, security, and end-of-year operations.</div></div></div>

      <div className="fs" style={{ maxWidth: 600 }}>
        <div className="fst"><GraduationCap size={16} /> School Details</div>
        <div className="fss">Appears in the header and on exported files.</div>
        <div className="fd"><label>School Name</label><input value={l.schoolName} onChange={e => s('schoolName', e.target.value)} /></div>
        <div className="fr2">
          <div className="fd"><label>Academic Year</label><input value={l.academicYear} onChange={e => s('academicYear', e.target.value)} /></div>
          <div className="fd"><label>Currency Symbol</label><input value={l.currency} onChange={e => s('currency', e.target.value)} maxLength={3} /></div>
        </div>
        <div className="fr2">
          <div className="fd"><label>Default Monthly Fee</label><input type="number" value={l.defaultMonthlyFee} onChange={e => s('defaultMonthlyFee', +e.target.value || 0)} /><div className="hi">Pre-fills when adding new students.</div></div>
          <div className="fd"><label>Default Session Fee</label><input type="number" value={l.defaultSessionFee || 0} onChange={e => s('defaultSessionFee', +e.target.value || 0)} /><div className="hi">Pre-fills when adding new students.</div></div>
        </div>
      </div>

      <div className="fs" style={{ maxWidth: 600 }}>
        <div className="fst"><ArrowRightCircle size={16} /> Year-End Promotion</div>
        <div className="fss">When a new academic year begins, promote students from one class to the next in a single step.</div>
        <button className="btn bp" onClick={onOpenPromote}><ArrowRightCircle size={14} /> Open Promote Tool</button>
      </div>

      <div className="fs" style={{ maxWidth: 600 }}>
        <div className="fst"><Lock size={16} /> Security</div>
        <div className="fss">Change your admin password. You'll keep using the current one until you confirm a new one.</div>
        <div className="fd"><label>Current Password</label><input type="password" value={pwOld} onChange={e => setPwOld(e.target.value)} placeholder="••••••" /></div>
        <div className="fr2">
          <div className="fd"><label>New Password</label><input type="password" value={pwNew} onChange={e => setPwNew(e.target.value)} placeholder="At least 4 characters" /></div>
          <div className="fd"><label>Confirm New Password</label><input type="password" value={pwNew2} onChange={e => setPwNew2(e.target.value)} placeholder="Repeat new password" /></div>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginTop: 6 }}>
          <button className="btn bg" onClick={onSignOut}><LogOut size={14} /> Sign out now</button>
          <button className="btn bp" onClick={submitPw} disabled={pwBusy || !pwOld || !pwNew || !pwNew2}><KeyRound size={14} /> {pwBusy ? 'Updating…' : 'Update Password'}</button>
        </div>
      </div>

      <div className="fs" style={{ maxWidth: 600 }}>
        <div className="fst"><Info size={16} /> Your Data</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ background: '#FAFBF7', padding: 14, borderRadius: 7, border: '1px solid #E6ECE1' }}>
            <div style={{ fontSize: 11, color: '#5C6B5F', letterSpacing: '.08em', textTransform: 'uppercase' }}>Students</div>
            <div className="serif" style={{ fontSize: 26, marginTop: 4 }}>{students.length}</div>
          </div>
          <div style={{ background: '#FAFBF7', padding: 14, borderRadius: 7, border: '1px solid #E6ECE1' }}>
            <div style={{ fontSize: 11, color: '#5C6B5F', letterSpacing: '.08em', textTransform: 'uppercase' }}>Payments</div>
            <div className="serif" style={{ fontSize: 26, marginTop: 4 }}>{payments.length}</div>
          </div>
        </div>
        <div style={{ fontSize: 12.5, color: '#5C6B5F', marginTop: 14, lineHeight: 1.6 }}>Data saves automatically. Export to CSV regularly for backups.</div>
      </div>

      <div className="dz" style={{ maxWidth: 600 }}>
        <h3>Danger Zone</h3>
        <p>Erase all students and payments. Export a backup CSV first.</p>
        <button className="btn bd" onClick={onClear}><Trash2 size={14} /> Erase All Data</button>
      </div>
    </>
  );
}

/* PROMOTE MODAL */
function PromoteModal({ byClass, onClose, onPromote }) {
  const [src, setSrc] = useState('');
  const [tgt, setTgt] = useState('');
  const [selected, setSelected] = useState({}); // id -> bool
  const [renumber, setRenumber] = useState(false);

  const srcStudents = src ? (byClass[src] || []) : [];

  // When source changes, select all by default
  useEffect(() => {
    if (!src) { setSelected({}); return; }
    const sel = {}; srcStudents.forEach(s => sel[s.id] = true);
    setSelected(sel);
    // Auto-suggest next class
    const idx = CLASSES.indexOf(src);
    if (idx >= 0 && idx < CLASSES.length - 1) setTgt(CLASSES[idx + 1]);
    else setTgt('');
  }, [src]);

  const selIds = Object.keys(selected).filter(id => selected[id]);
  const selectAll = () => { const sel = {}; srcStudents.forEach(s => sel[s.id] = true); setSelected(sel); };
  const deselectAll = () => setSelected({});
  const toggle = (id) => setSelected(p => ({ ...p, [id]: !p[id] }));

  const can = src && tgt && src !== tgt && selIds.length > 0;
  const submit = () => { if (can) onPromote(selIds, tgt, renumber); };

  const classesWithStudents = CLASSES.filter(c => (byClass[c] || []).length > 0);

  return (
    <div className="mov" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="mh"><div className="mt">Promote Class</div><button className="mc" onClick={onClose}><X size={18} /></button></div>
        <div className="mb">
          <div className="fss" style={{ marginBottom: 18 }}>Move students from one class to another — typically at the start of a new academic year.</div>

          <div className="fd"><label>From Class</label>
            <select value={src} onChange={e => setSrc(e.target.value)}>
              <option value="">— Select source class —</option>
              {classesWithStudents.map(c => <option key={c} value={c}>Class {c} ({(byClass[c] || []).length} students)</option>)}
            </select>
          </div>

          {src && (
            <>
              <div className="prom-arrow"><ArrowRightCircle size={20} /></div>

              <div className="fd"><label>To Class</label>
                <select value={tgt} onChange={e => setTgt(e.target.value)}>
                  <option value="">— Select destination class —</option>
                  {CLASSES.filter(c => c !== src).map(c => <option key={c} value={c}>Class {c} ({(byClass[c] || []).length} currently)</option>)}
                </select>
              </div>

              {tgt && (
                <div className="prom-summary">
                  <ArrowRightCircle size={16} style={{ flexShrink: 0 }} />
                  <span><strong>{selIds.length}</strong> of <strong>{srcStudents.length}</strong> student{srcStudents.length === 1 ? '' : 's'} will move from <strong>Class {src}</strong> to <strong>Class {tgt}</strong></span>
                </div>
              )}

              <div className="fd" style={{ marginBottom: 4 }}>
                <label style={{ marginBottom: 8 }}>Students to Promote</label>
                <div className="prom-list">
                  <div className="prom-meta">
                    <span>{selIds.length} selected</span>
                    <div style={{ display: 'flex', gap: 14 }}>
                      <button onClick={selectAll}>Select all</button>
                      <button onClick={deselectAll}>Deselect all</button>
                    </div>
                  </div>
                  {srcStudents.length === 0 ? <div style={{ padding: '14px', textAlign: 'center', color: '#8B9A8E', fontSize: 13 }}>No students in this class.</div> :
                    srcStudents.map(s => (
                      <div key={s.id} className="prom-row" onClick={() => toggle(s.id)}>
                        <input type="checkbox" checked={!!selected[s.id]} onChange={() => toggle(s.id)} onClick={e => e.stopPropagation()} />
                        <span className="rl">{s.rollNumber || '—'}</span>
                        <span className="nm">{s.fullName}</span>
                      </div>
                    ))
                  }
                </div>
              </div>

              {tgt && (
                <div className="opt-row" onClick={() => setRenumber(!renumber)}>
                  <input type="checkbox" checked={renumber} onChange={() => setRenumber(!renumber)} onClick={e => e.stopPropagation()} />
                  <div className="opt-l">
                    <div className="opt-t">Renumber roll numbers in Class {tgt}</div>
                    <div className="opt-s">Existing students in target class keep their order; promoted students get the next roll numbers. Off = keep old roll numbers (may cause duplicates).</div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="mf">
          <button className="btn bg" onClick={onClose}>Cancel</button>
          <button className="btn bp" onClick={submit} disabled={!can}><ArrowRightCircle size={14} /> Promote {selIds.length} Student{selIds.length === 1 ? '' : 's'}</button>
        </div>
      </div>
    </div>
  );
}

/* EDIT STUDENT MODAL */
function StudentForm({ student, settings, existing, onClose, onSave, onToast }) {
  const [f, setF] = useState({
    photo: student.photo || '',
    fullName: student.fullName || '', studentClass: student.studentClass || '', rollNumber: student.rollNumber || '',
    gender: student.gender || '', dob: student.dob || '', enrollmentDate: student.enrollmentDate || today(),
    parentName: student.parentName || '', parentPhone: student.parentPhone || '',
    motherName: student.motherName || '', motherPhone: student.motherPhone || '',
    address: student.address || '', monthlyFee: student.monthlyFee ?? 0, sessionFee: student.sessionFee ?? 0, notes: student.notes || ''
  });
  const s = (k, v) => setF(x => ({ ...x, [k]: v }));

  // Load existing photo from cache/storage when modal opens
  useEffect(() => {
    if (!student.hasPhoto || f.photo) return;
    if (photoCache.has(student.id)) {
      const v = photoCache.get(student.id);
      if (v) s('photo', v);
      return;
    }
    let cancelled = false;
    loadPhoto(student.id).then(v => { if (!cancelled && v) s('photo', v); });
    return () => { cancelled = true; };
  }, [student.id]);

  const warn = useMemo(() => {
    if (!f.studentClass || !f.rollNumber) return null;
    const c = existing.find(x => x.id !== student.id && x.studentClass === f.studentClass && x.rollNumber?.toString() === f.rollNumber?.toString());
    return c ? `Roll ${f.rollNumber} is used by ${c.fullName}` : null;
  }, [f.studentClass, f.rollNumber, existing, student.id]);
  const sub = () => { if (!f.fullName.trim() || !f.studentClass) return; onSave({ ...f, fullName: f.fullName.trim(), monthlyFee: +f.monthlyFee || 0, sessionFee: +f.sessionFee || 0 }); };

  return (
    <div className="mov" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="mh"><div className="mt">Edit Student</div><button className="mc" onClick={onClose}><X size={18} /></button></div>
        <div className="mb">
          <PhotoUploader photo={f.photo} onChange={(p) => s('photo', p)} onToast={onToast} />
          <div className="fd"><label>Full Name <span className="rq">*</span></label><input value={f.fullName} onChange={e => s('fullName', e.target.value)} autoFocus /></div>
          <div className="fr2">
            <div className="fd"><label>Class <span className="rq">*</span></label>
              <select value={f.studentClass} onChange={e => s('studentClass', e.target.value)}>
                <option value="">— Select —</option>
                {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="fd"><label>Roll Number</label>
              <input type="number" value={f.rollNumber} onChange={e => s('rollNumber', e.target.value)} />
              {warn && <div className="wn"><AlertCircle size={13} /> {warn}</div>}
            </div>
          </div>
          <div className="fr3">
            <div className="fd"><label>Gender</label>
              <select value={f.gender} onChange={e => s('gender', e.target.value)}>
                <option value="">—</option><option>Female</option><option>Male</option><option>Other</option>
              </select>
            </div>
            <div className="fd"><label>Date of Birth</label><input type="date" value={f.dob} onChange={e => s('dob', e.target.value)} /></div>
            <div className="fd"><label>Enrolled</label><input type="date" value={f.enrollmentDate} onChange={e => s('enrollmentDate', e.target.value)} /></div>
          </div>
          <div className="fr2">
            <div className="fd"><label>Monthly Fee ({settings.currency})</label><input type="number" value={f.monthlyFee} onChange={e => s('monthlyFee', e.target.value)} /></div>
            <div className="fd"><label>Session Fee ({settings.currency})</label><input type="number" value={f.sessionFee} onChange={e => s('sessionFee', e.target.value)} /></div>
          </div>
          <div style={{ height: 1, background: '#E6ECE1', margin: '18px 0' }}></div>
          <div className="fr2">
            <div className="fd"><label>Father / Guardian</label><input value={f.parentName} onChange={e => s('parentName', e.target.value)} /></div>
            <div className="fd"><label>Father's Phone</label><input value={f.parentPhone} onChange={e => s('parentPhone', e.target.value)} /></div>
          </div>
          <div className="fr2">
            <div className="fd"><label>Mother's Name</label><input value={f.motherName} onChange={e => s('motherName', e.target.value)} /></div>
            <div className="fd"><label>Mother's Phone</label><input value={f.motherPhone} onChange={e => s('motherPhone', e.target.value)} /></div>
          </div>
          <div className="fd"><label>Address</label><textarea value={f.address} onChange={e => s('address', e.target.value)} /></div>
          <div className="fd"><label>Notes</label><textarea value={f.notes} onChange={e => s('notes', e.target.value)} /></div>
        </div>
        <div className="mf">
          <button className="btn bg" onClick={onClose}>Cancel</button>
          <button className="btn bp" onClick={sub} disabled={!f.fullName.trim() || !f.studentClass}><Check size={14} /> Save Changes</button>
        </div>
      </div>
    </div>
  );
}
