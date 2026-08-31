"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, CheckCircle2, ChevronRight, CircleDollarSign, Clock3, FileText, LayoutDashboard, Menu, MoreHorizontal, Plus, Search, Send, Sparkles, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Quote = { id: string; client: string; service: string; value: number; status: "Aprovado" | "Enviado" | "Rascunho"; date: string };
const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const initialQuotes: Quote[] = [
  { id: "#024", client: "Mariana Costa", service: "Identidade visual", value: 2850, status: "Aprovado", date: "Hoje, 09:42" },
  { id: "#023", client: "Café Aurora", service: "Site institucional", value: 4200, status: "Enviado", date: "Ontem, 16:18" },
  { id: "#022", client: "Rafael Mendes", service: "Ensaio fotográfico", value: 980, status: "Rascunho", date: "28 ago, 11:30" },
  { id: "#021", client: "Studio Lume", service: "Gestão de redes sociais", value: 1600, status: "Aprovado", date: "27 ago, 14:05" },
];

function Status({ value }: { value: Quote["status"] }) {
  const styles = { Aprovado: "bg-emerald-50 text-emerald-700 ring-emerald-600/15", Enviado: "bg-blue-50 text-blue-700 ring-blue-600/15", Rascunho: "bg-stone-100 text-stone-600 ring-stone-600/10" };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[value]}`}>{value}</span>;
}

export default function Home() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [form, setForm] = useState({ client: "", service: "", value: "" });
  const filtered = useMemo(() => quotes.filter((q) => `${q.client} ${q.service}`.toLowerCase().includes(query.toLowerCase())), [quotes, query]);
  const total = quotes.reduce((sum, q) => sum + q.value, 0);
  const approved = quotes.filter((q) => q.status === "Aprovado").reduce((sum, q) => sum + q.value, 0);

  function createQuote(event: React.FormEvent) {
    event.preventDefault();
    if (!form.client || !form.service || !form.value) return;
    setQuotes((current) => [{ id: `#${String(25 + current.length - initialQuotes.length).padStart(3, "0")}`, client: form.client, service: form.service, value: Number(form.value), status: "Rascunho", date: "Agora" }, ...current]);
    setForm({ client: "", service: "", value: "" });
    setModal(false);
  }

  const nav = <nav className="space-y-1 px-3">
    <button className="nav-item nav-active"><LayoutDashboard /> Visão geral</button>
    <button className="nav-item"><FileText /> Orçamentos <span className="ml-auto rounded-full bg-white/80 px-2 py-0.5 text-[11px] text-stone-700">{quotes.length}</span></button>
    <button className="nav-item"><Users /> Clientes</button>
  </nav>;

  return <main className="min-h-screen bg-[#f6f5f1] text-stone-900">
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-stone-200/80 bg-[#fbfaf7] lg:block">
      <div className="flex h-20 items-center gap-3 px-6"><div className="grid size-10 place-items-center rounded-xl bg-[#d85832] text-white shadow-sm"><FileText className="size-5" /></div><div><p className="text-[17px] font-bold tracking-tight">Orçamento Fácil</p><p className="text-xs text-stone-500">Seu negócio, organizado.</p></div></div>
      {nav}
      <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-[#242520] p-4 text-white"><Sparkles className="mb-5 size-5 text-[#f1b36e]" /><p className="text-sm font-semibold">Plano profissional</p><p className="mt-1 text-xs leading-5 text-stone-400">Envios ilimitados e sua marca nos PDFs.</p><button className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#f1b36e]">Conhecer plano <ChevronRight className="size-3" /></button></div>
    </aside>

    {mobileNav && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setMobileNav(false)}><aside className="h-full w-72 bg-[#fbfaf7] p-4" onClick={(e) => e.stopPropagation()}><div className="mb-6 flex items-center justify-between"><b>Orçamento Fácil</b><Button variant="ghost" size="icon" onClick={() => setMobileNav(false)}><X /></Button></div>{nav}</aside></div>}

    <section className="lg:pl-64">
      <header className="flex h-20 items-center justify-between border-b border-stone-200/80 bg-[#fbfaf7]/90 px-5 backdrop-blur md:px-8">
        <div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileNav(true)}><Menu /></Button><div><p className="text-sm font-semibold">Boa tarde, Vick!</p><p className="hidden text-xs text-stone-500 sm:block">Aqui está o resumo do seu negócio hoje.</p></div></div>
        <div className="flex items-center gap-3"><div className="hidden rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-600 md:block">Segunda, 31 de agosto</div><div className="grid size-9 place-items-center rounded-full bg-[#f3c09d] text-sm font-bold text-[#7c2d12]">VA</div></div>
      </header>

      <div className="mx-auto max-w-7xl p-5 md:p-8">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[#c44825]">Painel financeiro</p><h1 className="text-3xl font-bold tracking-[-.04em] md:text-4xl">Visão geral</h1></div><Button onClick={() => setModal(true)} className="h-11 rounded-xl bg-[#d85832] px-5 text-white shadow-sm hover:bg-[#c44825]"><Plus /> Novo orçamento</Button></div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="metric-card"><CardContent className="p-5"><div className="metric-icon bg-orange-50 text-[#d85832]"><CircleDollarSign /></div><p className="metric-label">Total em orçamentos</p><p className="metric-value">{money.format(total)}</p><p className="metric-note text-emerald-700"><ArrowUpRight /> 18% este mês</p></CardContent></Card>
          <Card className="metric-card"><CardContent className="p-5"><div className="metric-icon bg-emerald-50 text-emerald-700"><CheckCircle2 /></div><p className="metric-label">Valor aprovado</p><p className="metric-value">{money.format(approved)}</p><p className="metric-note text-stone-500">{Math.round((approved / total) * 100)}% de conversão</p></CardContent></Card>
          <Card className="metric-card"><CardContent className="p-5"><div className="metric-icon bg-blue-50 text-blue-700"><Clock3 /></div><p className="metric-label">Aguardando resposta</p><p className="metric-value">{quotes.filter((q) => q.status === "Enviado").length}</p><p className="metric-note text-stone-500">Faça um lembrete hoje</p></CardContent></Card>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_300px]">
          <Card className="overflow-hidden rounded-2xl border-stone-200/80 bg-white py-0 shadow-none">
            <div className="flex flex-col gap-4 border-b border-stone-100 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold">Orçamentos recentes</h2><p className="mt-1 text-xs text-stone-500">Acompanhe suas últimas propostas.</p></div><div className="relative"><Search className="absolute left-3 top-2.5 size-4 text-stone-400" /><Input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-xl border-stone-200 pl-9 sm:w-64" placeholder="Buscar cliente..." /></div></div>
            <Table><TableHeader><TableRow className="bg-stone-50/70"><TableHead className="pl-5">Cliente</TableHead><TableHead>Serviço</TableHead><TableHead>Valor</TableHead><TableHead>Status</TableHead><TableHead className="hidden lg:table-cell">Atualização</TableHead><TableHead /></TableRow></TableHeader><TableBody>{filtered.map((q) => <TableRow key={q.id}><TableCell className="pl-5"><div className="font-semibold">{q.client}</div><div className="text-xs text-stone-400">{q.id}</div></TableCell><TableCell className="text-stone-600">{q.service}</TableCell><TableCell className="font-semibold">{money.format(q.value)}</TableCell><TableCell><Status value={q.status} /></TableCell><TableCell className="hidden text-stone-500 lg:table-cell">{q.date}</TableCell><TableCell><Button variant="ghost" size="icon-sm"><MoreHorizontal /></Button></TableCell></TableRow>)}</TableBody></Table>
            <div className="border-t border-stone-100 p-4 text-center"><button className="text-sm font-semibold text-[#c44825]">Ver todos os orçamentos</button></div>
          </Card>

          <div className="space-y-4">
            <Card className="overflow-hidden rounded-2xl border-0 bg-[#242520] py-0 text-white shadow-none"><CardContent className="p-6"><div className="mb-8 flex items-start justify-between"><div className="grid size-10 place-items-center rounded-xl bg-white/10"><Send className="size-5 text-[#f1b36e]" /></div><span className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-stone-300">Dica</span></div><h3 className="text-xl font-bold tracking-tight">Transforme propostas em vendas.</h3><p className="mt-2 text-sm leading-6 text-stone-400">Orçamentos enviados em até 1 hora têm mais chances de aprovação.</p><Button onClick={() => setModal(true)} className="mt-5 w-full rounded-xl bg-[#f1b36e] text-stone-900 hover:bg-[#eaa65b]">Criar agora <ArrowUpRight /></Button></CardContent></Card>
            <Card className="rounded-2xl border-stone-200/80 py-0 shadow-none"><CardContent className="p-5"><p className="text-xs font-bold uppercase tracking-widest text-stone-400">Meta mensal</p><div className="mt-3 flex items-end justify-between"><p className="text-xl font-bold">{money.format(approved)}</p><p className="text-xs text-stone-500">de R$ 10.000</p></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-100"><div className="h-full w-[45%] rounded-full bg-[#d85832]" /></div></CardContent></Card>
          </div>
        </div>
      </div>
    </section>

    {modal && <div className="fixed inset-0 z-50 grid place-items-center bg-stone-950/40 p-4 backdrop-blur-sm" onMouseDown={() => setModal(false)}><form onSubmit={createQuote} onMouseDown={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl md:p-8"><div className="mb-6 flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[#c44825]">Nova proposta</p><h2 className="mt-1 text-2xl font-bold tracking-tight">Criar orçamento</h2></div><Button type="button" variant="ghost" size="icon" onClick={() => setModal(false)}><X /></Button></div><div className="space-y-4"><label className="form-label">Cliente<Input autoFocus value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} placeholder="Ex.: Ana Oliveira" /></label><label className="form-label">Serviço ou produto<Input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} placeholder="Ex.: Desenvolvimento de site" /></label><label className="form-label">Valor total (R$)<Input type="number" min="1" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="0,00" /></label></div><div className="mt-7 flex justify-end gap-3"><Button type="button" variant="outline" onClick={() => setModal(false)}>Cancelar</Button><Button className="bg-[#d85832] hover:bg-[#c44825]"><FileText /> Salvar rascunho</Button></div></form></div>}
  </main>;
}
